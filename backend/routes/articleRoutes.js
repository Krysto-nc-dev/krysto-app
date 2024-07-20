import express from 'express'
const router = express.Router()
import {
  createArticle,
  deleteArticle,
  getArticleById,
  getArticles,
  updateArticle,
} from '../controllers/articleController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getArticles).post(protect, admin, createArticle)

router
  .route('/:id')
  .delete(protect, admin, deleteArticle)
  .get(getArticleById)
  .put(protect, admin, updateArticle)

router.route('/:id/reviews').post(protect, createProductReview)

export default router
