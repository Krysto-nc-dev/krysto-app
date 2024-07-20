import express from 'express'
const router = express.Router()
import {
  getPlasticTypes,
  createPlasticType,
  getPlasticTypeById,
  updatePlasticType,
  deletePlasticType,
} from '../controllers/plasticTypeController.js'

import { protect, admin } from '../middleware/authMiddleware.js'
// Routes pour les types de plastique sans middleware d'authentification protect
router
  .route('/')
  .get(getPlasticTypes) // Récupérer tous les types de plastique
  .post(protect, admin, createPlasticType) // Créer un nouveau type de plastique

router
  .route('/:id')
  .get(getPlasticTypeById) // Récupérer un type de plastique par ID
  .put(protect, admin, updatePlasticType) // Mettre à jour un type de plastique par ID
  .delete(protect, admin, deletePlasticType) // Supprimer un type de plastique par ID

export default router
