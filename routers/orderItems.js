import express from 'express'
import {getOrderItems,placeOrderItem,deleteOrderItem,updateOrderItem} from '../controller/orderItemsController.js'

const router = express.Router()

router.get('/:id', getOrderItems)

router.get('orderItem/:id', getOrderItems)

router.post('/placeOrderItem', placeOrderItem)

router.patch('/update/:id', updateOrderItem)

router.delete('/delete/:id', deleteOrderItem)

export default router