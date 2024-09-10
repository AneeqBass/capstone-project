import express from 'express';
import { fetchUsers, fetchUser, insertUser, deleteUser, updateUser, loginUser, getCurrentUser } from '../controller/usersController.js';
import { checkUser } from '../middleware/authentication.js';

const router = express.Router();

// Public Routes
router.get('/', fetchUsers);         // Fetch all users
router.get('/:id', fetchUser);       // Fetch user by ID
router.post('/login', checkUser, loginUser);  // Login user

// Protected Routes
router.get('/me', checkUser, getCurrentUser); // Fetch the current user's details
router.post('/register', insertUser); // Register a new user
router.patch('/update/:id', updateUser); // Update user by ID
router.delete('/delete/:id', deleteUser); // Delete user by ID

export default router;
