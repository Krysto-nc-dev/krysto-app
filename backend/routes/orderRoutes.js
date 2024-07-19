import express from 'express'
const router = express.Router()
import {
  getOrders,
  getOrderById,
  addOrderItems,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
} from '../controllers/orderController.js'

// Middleware d'authentification (par exemple : protect, admin)
import { protect, admin } from '../middleware/authMiddleware.js'

// Route pour récupérer les commandes de l'utilisateur connecté
router.route('/myOrders').get(protect, getMyOrders)

// Route pour ajouter une nouvelle commande
router.route('/').post(protect, addOrderItems)

// Route pour récupérer toutes les commandes (accessible seulement par l'admin)
router.route('/').get(protect, admin, getOrders)

// Route pour récupérer une commande par son ID
router.route('/:id').get(protect, getOrderById)

// Route pour mettre à jour le statut de paiement d'une commande
router.route('/:id/pay').put(protect, updateOrderToPaid)

// Route pour mettre à jour le statut de livraison d'une commande (accessible seulement par l'admin)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default router
