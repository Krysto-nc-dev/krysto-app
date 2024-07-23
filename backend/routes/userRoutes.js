import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  getPartnerProfile,
  updatePartnerProfile,
  getResellerProfile,
  updateResellerProfile,
} from '../controllers/userController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

// Auth routes
router.post('/login', authUser)
router.post('/register', registerUser)
router.post('/logout', protect, logoutUser) // Logout route protected

// User profile routes
router
  .route('/profile')
  .get(protect, getUserProfile) // User can access their own profile
  .put(protect, updateUserProfile) // User can update their own profile

// Admin routes for users
router
  .route('/')
  .post(registerUser) // Admin can register new users
  .get(protect, admin, getUsers) // Admin can get all users

router
  .route('/:id')
  .get(protect, admin, getUserById) // Admin can get user by ID
  .put(protect, admin, updateUser) // Admin can update user by ID
  .delete(protect, admin, deleteUser) // Admin can delete user by ID

// Partner profile routes
router
  .route('/partner/:id')
  .get(protect, getPartnerProfile) // Admin can get partner profile by ID
  .put(protect, updatePartnerProfile) // Admin can update partner profile by ID

// Reseller profile routes
router
  .route('/reseller/:id')
  .get(protect, getResellerProfile) // Admin can get reseller profile by ID
  .put(protect, updateResellerProfile) // Admin can update reseller profile by ID

export default router
