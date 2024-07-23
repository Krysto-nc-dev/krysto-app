import crypto from 'crypto'
import asyncHandler from '../middleware/asyncHandler.js'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import ErrorResponse from '../utils/errorResponse.js'
import sendEmail from '../utils/sendEmail.js'

// Auth user & get token
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id)
    res.status(200).json({
      _id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
    })
  } else {
    res.status(401)
    throw new Error("Le mot de passe ou l'email est incorrect")
  }
})

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, lastname, role } = req.body
  const userExist = await User.findOne({ email })

  if (userExist) {
    res.status(400)
    throw new Error('Cet utilisateur existe déjà')
  }

  const user = await User.create({
    name,
    lastname,
    email,
    password,
    role,
  })

  if (user) {
    // Create profile based on role
    if (user.role === 'Partner') {
      user.partnerProfile = {} // Initialize partner profile
    } else if (user.role === 'Reseller') {
      user.resellerProfile = { preferredStockLevels: [] } // Initialize reseller profile
    }
    await user.save()

    generateToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      lastname: user.lastname,
      isAdmin: user.isAdmin,
      role: user.role,
    })
  } else {
    res.status(400)
    throw new Error('Données invalides')
  }
})

// Logout user / clear cookie
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  })

  res.status(200).json({ message: 'Vous êtes déconnecté' })
})

// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  if (!req.user || !req.user._id) {
    res
      .status(400)
      .json({ message: 'Information utilisateur manquante dans la requête' })
    return
  }

  const user = await User.findById(req.user._id)

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
      partnerProfile: user.partnerProfile,
      resellerProfile: user.resellerProfile,
    })
  } else {
    res.status(404)
    throw new Error('Utilisateur introuvable')
  }
})

// Update profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.lastname = req.body.lastname || user.lastname
    user.email = req.body.email || user.email

    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      lastname: updatedUser.lastname,
      role: updatedUser.role,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('Utilisateur introuvable')
  }
})

// Get users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.status(200).json(users)
})

// Get user by id
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    res.status(200).json(user)
  } else {
    res.status(404)
    throw new Error('Utilisateur introuvable')
  }
})

// Delete user
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    if (user.isAdmin) {
      res.status(400)
      throw new Error('Vous ne pouvez pas supprimer un administrateur')
    }
    await user.deleteOne({ _id: user._id })
    res.status(201).json({ message: 'Utilisateur supprimé' })
  } else {
    res.status(404)
    throw new Error('Utilisateur introuvable')
  }
})

// Update user
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.role = req.body.role || user.role
    user.lastname = req.body.lastname || user.lastname
    user.isAdmin = Boolean(req.body.isAdmin)

    // Update profile based on role
    if (user.role === 'Partner' && !user.partnerProfile) {
      user.partnerProfile = {}
    } else if (user.role === 'Reseller' && !user.resellerProfile) {
      user.resellerProfile = { preferredStockLevels: [] }
    }

    const updatedUser = await user.save()
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      lastname: updatedUser.lastname,
      isAdmin: updatedUser.isAdmin,
      role: updatedUser.role,
    })
  } else {
    res.status(404)
    throw new Error('Utilisateur introuvable')
  }
})

// Update password
const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password')

  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Mot de passe incorrect', 401))
  }

  user.password = req.body.newPassword
  await user.save()

  sendTokenResponse(user, 200, res)
})

// Forgot password
const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return next(new ErrorResponse('Aucun utilisateur avec cet e-mail', 404))
  }

  const resetToken = user.getResetPasswordToken()

  await user.save({ validateBeforeSave: false })

  const resetUrl = `${req.protocol}://${req.get(
    'host',
  )}/api/users/resetpassword/${resetToken}`

  const message = `Vous recevez cet e-mail car vous (ou une autre personne) avez demandé la réinitialisation d'un mot de passe. Veuillez effectuer une requête à : \n\n ${resetUrl}`

  try {
    await sendEmail({
      email: user.email,
      subject: 'Demande de réinitialisation de mot de passe',
      message,
    })

    res.status(200).json({ success: true, data: 'Email envoyé avec succès.' })
  } catch (err) {
    console.log(err)
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save({ validateBeforeSave: false })

    return next(
      new ErrorResponse(
        "L'e-mail n'a pas été envoyé. Merci de réessayer.",
        500,
      ),
    )
  }
})

// Reset password
const resetPassword = asyncHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex')

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  })

  if (!user) {
    return next(new ErrorResponse('Token invalide', 400))
  }

  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined
  await user.save()

  sendTokenResponse(user, 200, res)
})

// Get partner profile
const getPartnerProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user || user.role !== 'Partner') {
    return res.status(404).json({ message: 'Profil de partenaire non trouvé' })
  }

  res.status(200).json(user.partnerProfile)
})

// Update partner profile
const updatePartnerProfile = asyncHandler(async (req, res) => {
  const { companyName, dollibarThirdPartyId } = req.body
  const user = await User.findById(req.params.id)

  if (!user || user.role !== 'Partner') {
    return res.status(404).json({ message: 'Profil de partenaire non trouvé' })
  }

  if (companyName) user.partnerProfile.companyName = companyName
  if (dollibarThirdPartyId)
    user.partnerProfile.dollibarThirdPartyId = dollibarThirdPartyId

  await user.save()
  res.status(200).json(user.partnerProfile)
})

// Get reseller profile
const getResellerProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user || user.role !== 'Reseller') {
    return res.status(404).json({ message: 'Profil de revendeur non trouvé' })
  }

  res.status(200).json(user.resellerProfile)
})

// Update reseller profile
const updateResellerProfile = asyncHandler(async (req, res) => {
  const {
    storeName,
    dollibarThirdPartyId,
    dollibarWarehousId,
    preferredStockLevels,
  } = req.body
  const user = await User.findById(req.params.id)

  if (!user || user.role !== 'Reseller') {
    return res.status(404).json({ message: 'Profil de revendeur non trouvé' })
  }

  if (storeName) user.resellerProfile.storeName = storeName
  if (dollibarThirdPartyId)
    user.resellerProfile.dollibarThirdPartyId = dollibarThirdPartyId
  if (dollibarWarehousId)
    user.resellerProfile.dollibarWarehousId = dollibarWarehousId
  if (preferredStockLevels)
    user.resellerProfile.preferredStockLevels = preferredStockLevels

  await user.save()
  res.status(200).json(user.resellerProfile)
})

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken()

  const options = {
    maxAge: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000, // Utilisez maxAge en millisecondes
    httpOnly: true,
  }

  if (process.env.NODE_ENV === 'production') {
    options.secure = true
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  })
}

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  updatePassword,
  forgotPassword,
  resetPassword,
  getPartnerProfile,
  updatePartnerProfile,
  getResellerProfile,
  updateResellerProfile,
}
