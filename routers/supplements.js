import express from 'express'
import {fetchSupplements,fetchSupplement,insertSupplement,deleteSupplement,updateSupplement} from '../controller/supplementsController.js'

const router = express.Router()

router.get('/', fetchSupplements)

router.get('/:id', fetchSupplement)

router.post('/addSupplement', insertSupplement)

router.patch('/update/:id', updateSupplement)

router.delete('/delete/:id', deleteSupplement)

export default router