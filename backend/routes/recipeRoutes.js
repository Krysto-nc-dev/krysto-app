import express from 'express'
const router = express.Router()
import {
  getRecipes,
  createRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} from '../controllers/recipeController.js'

import { protect, admin } from '../middleware/authMiddleware.js'
router
  .route('/')
  .get(protect, admin, getRecipes) // Récupérer toutes les recettes
  .post(protect, admin, createRecipe) // Créer une nouvelle recette

router
  .route('/:id')
  .get(protect, admin, getRecipeById) // Récupérer une recette par ID
  .put(protect, admin, updateRecipe) // Mettre à jour une recette par ID
  .delete(protect, admin, deleteRecipe) // Supprimer une recette par ID

export default router
