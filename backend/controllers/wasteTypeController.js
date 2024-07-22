import asyncHandler from '../middleware/asyncHandler.js'
import WasteType from '../models/WasteTypeModel.js'

// @desc    Get all wasteTypes
// @route   GET /api/wastes
// @access  Private/Admin
const getWastes = asyncHandler(async (req, res) => {
  const wasteTypes = await WasteType.find()
  res.status(200).json(wasteTypes)
})

// @desc    Create a new waste type
// @route   POST /api/wastes
// @access  Private/Admin
const createWaste = asyncHandler(async (req, res) => {
  const { waste } = req.body

  const newWaste = new WasteType({
    waste: 'Sample Waste',
  })

  const createdWaste = await newWaste.save()
  res.status(201).json(createdWaste)
})

// @desc    Get Waste by ID
// @route   GET /api/wastes/:id
// @access  Private/Admin
const getWasteById = asyncHandler(async (req, res) => {
  const waste = await WasteType.findById(req.params.id)

  if (waste) {
    res.status(200).json(waste)
  } else {
    res.status(404)
    throw new Error('Type de déchet non trouvé')
  }
})

// @desc    Update waste
// @route   PUT /api/wastes/:id
// @access  Private/Admin
const updateWaste = asyncHandler(async (req, res) => {
  const { waste } = req.body

  const updatedWaste = await EmailBank.findByIdAndUpdate(
    req.params.id,
    { waste },
    { new: true, runValidators: true },
  )

  if (updatedWaste) {
    res.status(200).json(updatedWaste)
  } else {
    res.status(404)
    throw new Error('Déchet non trouvé')
  }
})

// @desc    Delete waste
// @route   DELETE /api/wastes/:id
// @access  Private/Admin
const deleteWaste = asyncHandler(async (req, res) => {
  const waste = await WasteType.findById(req.params.id)

  if (waste) {
    await waste.deleteOne()
    res.status(200).json({ message: 'Déchet Supprimé' })
  } else {
    res.status(404)
    throw new Error('Déchet non trouvé')
  }
})

export { getWastes, deleteWaste, updateWaste, getWasteById, createWaste }
