import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/productModel.js'

// @desc Get products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.status(200).json(products)
})
// @desc Create a products
// @route POST /api/products
// @access Private/Admon
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    dolibarrId: 'Sample Id',
    name: 'Sample name',
    description: 'Sample description',
    price: 0,
    quantity: 0,
    image: '/images/no-photo.png',
    category: 'Sample category',
    user: req.user._id,
    countInStock: 0,
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc Get product by id
// @route GET /api/product/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.status(200).json(product)
  } else {
    res.status(404)
    throw new Error('Produit non trouvé.')
  }
})

export { getProducts, getProductById, createProduct }
