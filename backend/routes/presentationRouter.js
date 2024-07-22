import express from 'express'
const router = express.Router()
import {
  getPresentations,
  getPresentationById,
  createPresentation,
  updatePresentation,
  deletePresentation,
  addSlideToPresentation,
  updateSlideInPresentation,
  deleteSlideFromPresentation,
} from '../controllers/presentationController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

// Routes pour les présentations
router
  .route('/')
  .get(getPresentations) // Obtenir toutes les présentations
  .post(protect, admin, createPresentation) // Créer une nouvelle présentation

router
  .route('/:id')
  .get(getPresentationById) // Obtenir une présentation spécifique par ID
  .put(protect, admin, updatePresentation) // Mettre à jour une présentation
  .delete(protect, admin, deletePresentation) // Supprimer une présentation

// Routes pour gérer les diapositives au sein d'une présentation spécifique
router.route('/:id/slides').post(protect, admin, addSlideToPresentation) // Ajouter une diapositive à une présentation

router
  .route('/:id/slides/:slideId')
  .put(protect, admin, updateSlideInPresentation) // Mettre à jour une diapositive dans une présentation
  .delete(protect, admin, deleteSlideFromPresentation) // Supprimer une diapositive d'une présentation

export default router
