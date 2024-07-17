import express from 'express'
const router = express.Router()
import {
  getProductById,
  getProducts,
} from '../controllers/productController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts)

router
  .route('/:id')

  .get(protect, getProductById)

export default router
