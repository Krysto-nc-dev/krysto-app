import express from 'express'
const router = express.Router()
import {
  createArticle,
  createArticleReview,
  deleteArticle,
  getArticleById,
  getArticles,
  updateArticle,
  addArticleParagraph, // Importer la fonction pour ajouter un paragraphe
} from '../controllers/articleController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

// Routes pour les articles
router
  .route('/')
  .get(getArticles) // Obtenir tous les articles
  .post(protect, admin, createArticle) // Créer un nouvel article

router
  .route('/:id')
  .get(getArticleById) // Obtenir un article par ID
  .put(protect, admin, updateArticle) // Mettre à jour un article
  .delete(protect, admin, deleteArticle) // Supprimer un article

// Route pour ajouter un paragraphe à un article
router.route('/:id/paragraphs').post(protect, admin, addArticleParagraph) // Ajouter un paragraphe

// Route pour ajouter une critique à un article
router.route('/:id/reviews').post(protect, createArticleReview) // Ajouter une critique

export default router
