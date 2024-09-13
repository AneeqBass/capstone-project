import {getOrderItemsDb, getOrderItemDb, placeOrderItemDb, deleteOrderItemDb, updateOrderItemDb} from '../model/orderItemsDB.js'

const getOrderItems = async(req,res)=>{
    res.json(await getOrderItemsDb(req.params.id))
}

const getOrderItem = async (req, res) => {
    let { stockId } = req.body; 
    let orderId = req.params.id;
        res.json(await getOrderItemDb(orderId, stockId));  
};

const placeOrderItem = async (req, res) => {
    try {
        let { orderId, stockId, quantity, price, priceTotal } = req.body;
        await placeOrderItemDb(orderId, stockId, quantity, price, priceTotal);

        res.status(200).send('OrderItem was added successfully');
    } catch (error) {
        res.status(404).send('An error occurred while adding the orderItem');
    }
};

const deleteOrderItem = async (req, res) => {
    try {
        await deleteOrderItemDb(req.params.id);
        res.status(200).send('OrderItem was deleted successfully');
    } catch (error) {
        res.status(404).send('An error occurred while trying to delete a orderItem');
    }
};

const updateOrderItem = async (req, res) => {
    try {
        let { quantity, priceTotal } = req.body;
        let orderItem = await getOrderItemDb(req.params.id);

        quantity?quantity=quantity:quantity = orderItem.quantity
        priceTotal?priceTotal=priceTotal:priceTotal = orderItem.priceTotal

        await updateOrderItemDb(quantity, priceTotal, req.params.id);
        res.status(200).send('OrderItem was updated successfully');

    } catch (error) {
        res.status(404).send('An error occurred while updating the orderItem');
    }
};

export{getOrderItems, getOrderItem, placeOrderItem, deleteOrderItem, updateOrderItem}