import express from 'express'
import {fetchEquipments,fetchEquipment,insertEquipment,deleteEquipment,updateEquipment} from '../controller/equipmentController.js'

const router = express.Router()

router.get('/', fetchEquipments)

router.get('/:id', fetchEquipment)

router.post('/addEquipment', insertEquipment)

router.patch('/update/:id', updateEquipment)

router.delete('/delete/:id', deleteEquipment)

export default router