import express from 'express'
const router = express.Router()
import {
  createRecyclableProduct,
  deleteRecyclableProduct,
  getRecyclableProductById,
  getRecyclableProducts,
  updateRecyclableProduct,
} from '../controllers/recyclableProductController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

router
  .route('/')
  .get(getRecyclableProducts)
  .post(protect, admin, createRecyclableProduct)

router
  .route('/:id')
  .delete(protect, admin, deleteRecyclableProduct)
  .get(getRecyclableProductById)
  .put(protect, admin, updateRecyclableProduct)

export default router
