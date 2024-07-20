import express from 'express'
const router = express.Router()
import {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} from '../controllers/productController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, admin, createProduct)

router
  .route('/:id')
  .delete(protect, admin, deleteProduct)
  .get(getProductById)
  .put(protect, admin, updateProduct)

  .get(getProductById)
router.route('/:id/reviews').post(protect, createProductReview)

export default router
