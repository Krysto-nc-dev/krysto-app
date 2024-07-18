import express from 'express'
const router = express.Router()
import {
  getOrders,
  getOrderById,
  addOrderItems,
  getMyOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
} from '../controllers/orderController.js'

// Middleware d'authentification (par exemple : protect, admin)
// import { protect, admin } from '../middleware/authMiddleware.js';

// Routes pour les commandes
router.route('/').get(getOrders).post(addOrderItems)
router.route('/myorders').get(getMyOrders)
router.route('/:id').get(getOrderById)
router.route('/:id/pay').get(updateOrderToPaid)
router.route('/:id/deliver').get(updateOrderToDelivered)

export default router
