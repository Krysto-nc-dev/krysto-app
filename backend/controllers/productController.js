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
    images: ['/uploads/no-photo.png'],
    category: 'Sample category',
    user: req.user._id,
    countInStock: 0,
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})
// @desc UPDATE products
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    dolibarrId,
    category,
    images,
    countInStock,
  } = req.body
  const product = await Product.findByIdAndUpdate(req.params.id)
  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.dolibarrId = dolibarrId
    product.category = category
    product.images = images
    product.countInStock = countInStock
    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Produit non trouvé.')
  }
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

// @desc DELETE product
// @route DEL /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id)
  if (product) {
    await Product.deleteOne({ _id: product._id })
    res
      .status(200)
      .json({ message: 'Product deleted successfully', product: product })
  } else {
    res.status(404)
    throw new Error('Produit non trouvé.')
  }
})

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}
