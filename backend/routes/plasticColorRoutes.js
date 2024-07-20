import express from 'express'
const router = express.Router()
import {
  createPlasticColor,
  deletePlasticColor,
  getPlasticColorById,
  getPlasticColors,
  updatePlasticColor,
} from '../controllers/plasticColorsController.js'

import { protect, admin } from '../middleware/authMiddleware.js'
// Routes pour les types de plastique sans middleware d'authentification protect
router
  .route('/')
  .get(getPlasticColors) // Récupérer tous les types de plastique
  .post(protect, admin, createPlasticColor) // Créer un nouveau type de plastique

router
  .route('/:id')
  .get(getPlasticColorById) // Récupérer un type de plastique par ID
  .put(protect, admin, updatePlasticColor) // Mettre à jour un type de plastique par ID
  .delete(protect, admin, deletePlasticColor) // Supprimer un type de plastique par ID

export default router
