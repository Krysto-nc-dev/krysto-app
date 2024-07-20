import asyncHandler from '../middleware/asyncHandler.js'
import PlasticColor from '../models/plasticColorModel.js'

// @desc Get all plastic colors
// @route GET /api/plasticColors
// @access Public
const getPlasticColors = asyncHandler(async (req, res) => {
  const plasticColors = await PlasticColor.find({})
  res.status(200).json(plasticColors)
})

// @desc Get plastic color by id
// @route GET /api/plasticColors/:id
// @access Public
const getPlasticColorById = asyncHandler(async (req, res) => {
  const plasticColor = await PlasticColor.findById(req.params.id)
  if (plasticColor) {
    res.status(200).json(plasticColor)
  } else {
    res.status(404)
    throw new Error('Plastic color not found.')
  }
})

// @desc Create a new plastic color
// @route POST /api/plasticColors
// @access Private/Admin
const createPlasticColor = asyncHandler(async (req, res) => {
  const { name, images, rarityIndex } = req.body
  const plasticColor = new PlasticColor({
    name: 'sample name',
    images: ['/uploads/no-photo.png'],
    rarityIndex: 1,
  })
  const createdPlasticColor = await plasticColor.save()
  res.status(201).json(createdPlasticColor)
})

// @desc Update a plastic color
// @route PUT /api/plasticColors/:id
// @access Private/Admin
const updatePlasticColor = asyncHandler(async (req, res) => {
  const { name, images, rarityIndex } = req.body
  const plasticColor = await PlasticColor.findById(req.params.id)
  if (plasticColor) {
    plasticColor.name = name || plasticColor.name
    plasticColor.images = images || plasticColor.images
    plasticColor.rarityIndex = rarityIndex || plasticColor.rarityIndex

    const updatedPlasticColor = await plasticColor.save()
    res.json(updatedPlasticColor)
  } else {
    res.status(404)
    throw new Error('Plastic color not found.')
  }
})

// @desc Delete a plastic color
// @route DELETE /api/plasticColors/:id
// @access Private/Admin
const deletePlasticColor = asyncHandler(async (req, res) => {
  const plasticColor = await PlasticColor.findById(req.params.id)
  if (plasticColor) {
    await PlasticColor.deleteOne({ _id: plasticColor._id })
    res
      .status(200)
      .json({ message: 'Plastic color deleted successfully', plasticColor })
  } else {
    res.status(404)
    throw new Error('Plastic color not found.')
  }
})

export {
  getPlasticColors,
  getPlasticColorById,
  createPlasticColor,
  updatePlasticColor,
  deletePlasticColor,
}
