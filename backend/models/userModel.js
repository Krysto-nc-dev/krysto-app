import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

// Sous-schéma pour le niveau de stock souhaité
const preferredStockLevelSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  desiredQuantity: {
    type: Number,
    required: true,
  },
})

// Sous-schéma pour le profil de Partenaire
const partnerProfileSchema = new mongoose.Schema({
  companyName: { type: String },
  dollibarThirdPartyId: { type: String },
})

// Sous-schéma pour le profil de Revendeur
const resellerProfileSchema = new mongoose.Schema({
  storeName: { type: String },
  dollibarThirdPartyId: { type: String },
  dollibarWarehousId: { type: String },
  preferredStockLevels: [preferredStockLevelSchema],
  margin: { type: Number, required: true, default: 0 },
})

// Schéma principal de l'utilisateur
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Veuillez renseigner une adresse email valide',
      ],
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
          return regex.test(value)
        },
        message: (props) =>
          `Le mot de passe doit contenir au moins 8 caractères, une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial (!@#$%^&*).`,
      },
    },
    role: {
      type: String,
      enum: ['User', 'Partner', 'Reseller'],
      required: true,
      default: 'User',
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    // Champs pour les profils spécifiques
    partnerProfile: partnerProfileSchema,
    resellerProfile: resellerProfileSchema,
  },
  { timestamps: true },
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

const User = mongoose.model('User', userSchema)

export default User
