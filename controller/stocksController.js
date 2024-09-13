import { getStocksDb, getStocksFromOrderIdDb, getStockDb, insertStockDb, deleteStockDb, updateStockDb } from '../model/stocksDB.js'

const fetchStocks = async (req, res) => {
    res.json(await getStocksDb())
}

const getStocksFromOrderId = async (req, res) => {
    res.json(await getStocksFromOrderIdDb(req.params.id))
}

const fetchStock = async (req, res) => {
    res.json(await getStockDb(req.params.id))
}

const insertStock = async (req, res) => {
    try {
        let { name, description, category, price, quantity, imgUrl, createdUserId } = req.body;
        await insertStockDb(name, description, category, price, quantity, imgUrl, createdUserId);

        res.status(200).send('Stock was added successfully');
    } catch (error) {
        res.status(404).send('An error occurred while adding the stock');
    }
};

const deleteStock = async (req, res) => {
    try {
        await deleteStockDb(req.params.id);
        res.status(200).send('Stock was deleted successfully');
    } catch (error) {
        res.status(404).send('An error occurred while trying to delete a stock');
    }
};


const updateStock = async (req, res) => {
    try {
        let { name, description, category, price, quantity, imgUrl } = req.body;
        let stock = await getStockDb(req.params.id);

        name ? name = name : name = stock.name
        description ? description = description : description = stock.description
        category ? category = category : category = stock.category
        price ? price = price : price = stock.price
        quantity ? quantity = quantity : quantity = stock.quantity
        imgUrl ? imgUrl = imgUrl : imgUrl = stock.imgUrl

        await updateStockDb(name, description, category, price, quantity, imgUrl, req.params.id);
        res.status(200).send('Stock was updated successfully');

    } catch (error) {
        res.status(404).send('An error occurred while updating the stock');
    }
};

export { fetchStocks, getStocksFromOrderId, fetchStock, insertStock, deleteStock, updateStock }