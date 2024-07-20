import express from 'express'
const router = express.Router()
import {
  getEmails,
  createEmail,
  getEmailById,
  updateEmail,
  deleteEmail,
} from '../controllers/emailBankController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

router
  .route('/')
  .get(protect, admin, getEmails) // Récupérer tous les emails
  .post(createEmail) // Créer un nouvel email

router
  .route('/:id')
  .get(protect, admin, getEmailById) // Récupérer un email par ID
  .put(protect, admin, updateEmail) // Mettre à jour un email par ID
  .delete(protect, admin, deleteEmail) // Supprimer un email par ID

export default router
