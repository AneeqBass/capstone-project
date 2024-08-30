import {getSupplementsDb, getSupplementDb, insertSupplementDb, deleteSupplementDb, updateSupplementDb} from '../model/supplementsDB.js'

const fetchSupplements = async(req,res) =>{
    res.json(await getSupplementsDb())
}


const fetchSupplement = async(req,res)=>{
    res.json(await getSupplementDb(req.params.id))
}

const insertSupplement = async (req, res) => {
    try {
        let { name, description, category, price, quantity, imgUrl, createdUserId } = req.body;
        await insertSupplementDb(name, description, category, price, quantity, imgUrl, createdUserId);

        res.status(200).send('Supplement was added successfully');
    } catch (error) {
        res.status(404).send('An error occurred while adding the supplement');
    }
};

const deleteSupplement = async (req, res) => {
    try {
        await deleteSupplementDb(req.params.id);
        res.status(200).send('Supplement was deleted successfully');
    } catch (error) {
        res.status(404).send('An error occurred while trying to delete a supplement');
    }
};


const updateSupplement = async (req, res) => {
    try {
        let { name, description, category, price, quantity, imgUrl, createdUserId } = req.body;
        let supplement = await getSupplementDb(req.params.id);
        name?name=name:name = supplement.name
        description?description=description:description = supplement.description
        category?category=category:category = supplement.category
        price?price=price:price = supplement.price
        quantity?quantity=quantity:quantity = supplement.quantity
        imgUrl?imgUrl=imgUrl:imgUrl = supplement.imgUrl
        createdUserId?createdUserId=createdUserId:createdUserId + supplement.createdUserId
        await updateSupplementDb(name, description, category, price, quantity, imgUrl, createdUserId, req.params.id);
        res.status(200).send('Supplement was updated successfully');

    } catch (error) {
        res.status(404).send('An error occurred while updating the supplement');
    }
};

export{fetchSupplements,fetchSupplement,insertSupplement,deleteSupplement,updateSupplement}