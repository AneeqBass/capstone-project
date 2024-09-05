import {getEquipmentsDb, getEquipmentDb, insertEquipmentDb, deleteEquipmentDb, updateEquipmentDb} from '../model/equipmentDB.js'

const fetchEquipments = async(req,res) =>{
    res.json(await getEquipmentsDb())
}


const fetchEquipment = async(req,res)=>{
    res.json(await getEquipmentDb(req.params.id))
}

const insertEquipment = async (req, res) => {
    try {
        let { name, price, quantity, quantityDueMaintenance, imgUrl, createdUserId } = req.body;
        await insertEquipmentDb(name, price, quantity, quantityDueMaintenance, imgUrl, createdUserId);

        res.status(200).send('Equipment was added successfully');
    } catch (error) {
        res.status(404).send('An error occurred while adding the equipment');
    }
};

const deleteEquipment = async (req, res) => {
    try {
        await deleteEquipmentDb(req.params.id);
        res.status(200).send('Equipment was deleted successfully');
    } catch (error) {
        res.status(404).send('An error occurred while trying to delete an equipment');
    }
};


const updateEquipment = async (req, res) => {
    try {
        let { name, price, quantity, quantityDueMaintenance, imgUrl } = req.body;
        let equipment = await getEquipmentDb(req.params.id);

        name?name=name:name = equipment.name
        price?price=price:price = equipment.price
        quantity?quantity=quantity:quantity = equipment.quantity
        quantityDueMaintenance?quantityDueMaintenance=quantityDueMaintenance:quantityDueMaintenance = equipment.quantityDueMaintenance
        imgUrl?imgUrl=imgUrl:imgUrl = equipment.imgUrl
         
        await updateEquipmentDb(name, price, quantity, quantityDueMaintenance, imgUrl, req.params.id);
        res.status(200).send('Equipment was updated successfully');

    } catch (error) {
        res.status(404).send('An error occurred while updating the equipment');
    }
};

export{fetchEquipments,fetchEquipment,insertEquipment,deleteEquipment,updateEquipment}