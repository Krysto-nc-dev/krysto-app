import express from 'express'
import {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  addStage,
} from '../controllers/projectControllers.js'

const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(protect, getProjects).post(protect, admin, createProject)
router
  .route('/:id')
  .get(protect, getProjectById)
  .put(protect, admin, updateProject)
  .delete(protect, admin, deleteProject)
router.route('/:id/stages').post(protect, admin, addStage)

export default router
