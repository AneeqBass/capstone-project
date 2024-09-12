import express from 'express'
import {fetchOrders,fetchOrder,placeOrder,deleteOrder,updateOrder} from '../controller/ordersController.js'

const router = express.Router()

router.get('/', fetchOrders)

router.get('/:id', fetchOrder)

router.post('/placeOrder', placeOrder)

router.patch('/update/:id', updateOrder)

router.delete('/delete/:id', deleteOrder)

export default router