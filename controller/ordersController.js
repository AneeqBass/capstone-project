import { getOrdersDb, getOrderDb, placeOrderDb, deleteOrderDb, updateOrderDb } from '../model/ordersDB.js'

const fetchOrders = async (req, res) => {
    res.json(await getOrdersDb())
}

const fetchOrder = async (req, res) => {
    res.json(await getOrderDb(req.params.id))
}

const placeOrder = async (req, res) => {
    try {
        let { userId, date, priceTotal } = req.body;
        await placeOrderDb(userId, date, priceTotal);

        res.status(200).send('Order was added successfully');
    } catch (error) {
        res.status(404).send('An error occurred while adding the order');
    }
};

const deleteOrder = async (req, res) => {
    try {
        await deleteOrderDb(req.params.id);
        res.status(200).send('Order was deleted successfully');
    } catch (error) {
        res.status(404).send('An error occurred while trying to delete a order');
    }
};

const updateOrder = async (req, res) => {
    try {
        let { priceTotal } = req.body;
        let order = await getOrderDb(req.params.id);

        priceTotal ? priceTotal = priceTotal : priceTotal = order.priceTotal

        await updateOrderDb(priceTotal, req.params.id);
        res.status(200).send('Order was updated successfully');

    } catch (error) {
        res.status(404).send('An error occurred while updating the order');
    }
};

export { fetchOrders, fetchOrder, placeOrder, deleteOrder, updateOrder }