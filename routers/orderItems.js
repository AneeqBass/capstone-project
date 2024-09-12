import express from 'express'
import {fetchOrderItems,fetchOrderItem,placeOrderItem,deleteOrderItem,updateOrderItem} from '../controller/orderItemsController.js'

const router = express.Router()

router.get('/', fetchOrderItems)

router.get('/:id', fetchOrderItem)

router.post('/placeOrderItem', placeOrderItem)

router.patch('/update/:id', updateOrderItem)

router.delete('/delete/:id', deleteOrderItem)

export default router