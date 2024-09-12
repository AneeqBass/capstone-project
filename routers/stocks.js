import express from 'express'
import {fetchStocks,fetchStock,insertStock,deleteStock,updateStock} from '../controller/stocksController.js'

const router = express.Router()

router.get('/', fetchStocks)

router.get('/:id', fetchStock)

router.post('/addStock', insertStock)

router.patch('/update/:id', updateStock)

router.delete('/delete/:id', deleteStock)

export default router