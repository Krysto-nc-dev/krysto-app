import asyncHandler from '../middleware/asyncHandler.js'
import RecyclableProduct from '../models/recyclableProductModel.js'

// @desc Get all recyclable products
// @route GET /api/recyclableProducts
// @access Public
const getRecyclableProducts = asyncHandler(async (req, res) => {
  const recyclableProducts = await RecyclableProduct.find({})
  // .populate('colors', 'name')
  // .populate('plastic_types', 'type')
  res.status(200).json(recyclableProducts)
})

// @desc Get recyclable product by id
// @route GET /api/recyclableProducts/:id
// @access Public
const getRecyclableProductById = asyncHandler(async (req, res) => {
  const recyclableProduct = await RecyclableProduct.findById(req.params.id)
  // .populate('colors', 'name')
  // .populate('plastic_types', 'type')
  if (recyclableProduct) {
    res.status(200).json(recyclableProduct)
  } else {
    res.status(404)
    throw new Error('Recyclable product not found.')
  }
})

// @desc Create a new recyclable product
// @route POST /api/recyclableProducts
// @access Private/Admin
const createRecyclableProduct = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    brand,
    plastic_types,
    colors,
    weightGr,
    barCode,
    description,
    recyclingNote,
    images,
  } = req.body

  // Check if a product with the same name or barcode already exists
  const existingProduct = await RecyclableProduct.findOne({
    $or: [{ name }, { barCode }],
  })
  if (existingProduct) {
    res.status(400)
    throw new Error('Product with this name or barcode already exists.')
  }

  const recyclableProduct = new RecyclableProduct({
    name: 'Sample Name',
    category: 'Alimentaires',
    brand: 'Sample brand',
    plastic_types: [],
    colors: [],
    weightGr: 0,
    barCode: 'Sample barcode',
    description: 'Sample Description',
    recyclingNote: 1,
    images: ['/uploads/no-photo.png'],
  })

  const createdRecyclableProduct = await recyclableProduct.save()
  res.status(201).json(createdRecyclableProduct)
})

// @desc Update a recyclable product
// @route PUT /api/recyclableProducts/:id
// @access Private/Admin
const updateRecyclableProduct = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    brand,
    plastic_types,
    colors,
    weightGr,
    barCode,
    description,
    recyclingNote,
    images,
  } = req.body

  const recyclableProduct = await RecyclableProduct.findById(req.params.id)
  if (recyclableProduct) {
    recyclableProduct.name = name || recyclableProduct.name
    recyclableProduct.category = category || recyclableProduct.category
    recyclableProduct.brand = brand || recyclableProduct.brand
    recyclableProduct.plastic_types =
      plastic_types || recyclableProduct.plastic_types
    recyclableProduct.colors = colors || recyclableProduct.colors
    recyclableProduct.weightGr = weightGr || recyclableProduct.weightGr
    recyclableProduct.barCode = barCode || recyclableProduct.barCode
    recyclableProduct.description = description || recyclableProduct.description
    recyclableProduct.recyclingNote =
      recyclingNote || recyclableProduct.recyclingNote
    recyclableProduct.images = images || recyclableProduct.images

    const updatedRecyclableProduct = await recyclableProduct.save()
    res.json(updatedRecyclableProduct)
  } else {
    res.status(404)
    throw new Error('Recyclable product not found.')
  }
})

// @desc Delete a recyclable product
// @route DELETE /api/recyclableProducts/:id
// @access Private/Admin
const deleteRecyclableProduct = asyncHandler(async (req, res) => {
  const recyclableProduct = await RecyclableProduct.findById(req.params.id)
  if (recyclableProduct) {
    await RecyclableProduct.deleteOne({ _id: recyclableProduct._id })
    res.status(200).json({
      message: 'Recyclable product deleted successfully',
      recyclableProduct,
    })
  } else {
    res.status(404)
    throw new Error('Recyclable product not found.')
  }
})

export {
  getRecyclableProducts,
  getRecyclableProductById,
  createRecyclableProduct,
  updateRecyclableProduct,
  deleteRecyclableProduct,
}
