import express from 'express'
import {fetchUsers,fetchUser,insertUser,deleteUser,updateUser,loginUser} from '../controller/usersController.js'
import { checkUser } from '../middleware/authentication.js'
// import {createToken,verifyAToken} from '../middleware/authentication.js'

const router = express.Router()

router.get('/', fetchUsers)

router.get('/:id', fetchUser)

router.post('/login', checkUser, loginUser)

router.post('/register', insertUser)

router.patch('/update/:id', updateUser)

router.delete('/delete/:id', deleteUser)

export default router