import express from 'express';
import { fetchUsers, fetchUser, insertUser, deleteUser, updateUser, loginUser } from '../controller/usersController.js';
import { verifyAToken } from '../middleware/authentication.js'

const router = express.Router();

// Public Routes
router.get('/', fetchUsers);         // Fetch all users
router.get('/:id', fetchUser);       // Fetch user by ID

router.get('/auth', verifyAToken, async(req,res)=>{
    res.json(req.body.user)
    console.log(req.body.user);
    
})

router.post('/login', loginUser);
router.post('/register', insertUser); // Register a new user
router.patch('/update/:id', updateUser); // Update user by ID
router.delete('/delete/:id', deleteUser); // Delete user by ID

export default router;
