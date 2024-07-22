import express from 'express'
const router = express.Router()
import {
  createWaste,
  deleteWaste,
  getWasteById,
  getWastes,
  updateWaste,
} from '../controllers/wasteTypeController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getWastes).post(protect, admin, createWaste)

router
  .route('/:id')
  .get(protect, admin, getWasteById)
  .put(protect, admin, updateWaste)
  .delete(protect, admin, deleteWaste)
export default router
