import { createPool } from 'mysql2/promise'
import { config } from 'dotenv'

config()

const pool = createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
})

const getStocksDb = async () => {
    let [data] = await pool.query('SELECT * FROM stocks')
    return data;
}

const getStocksFromOrderIdDb = async (orderId, stockId) => {
    let [data] = await pool.query(`SELECT s.*
    FROM stocks s
    INNER JOIN orderItems oi ON s.Id = oi.stockId
    WHERE oi.orderId = ? AND oi.stockId = ?`, [orderId, stockId])
    return data;
};

const getStockDb = async (id) => {
    let [[data]] = await pool.query('SELECT * FROM stocks WHERE id = ?', [id])
    return data;
}


const insertStockDb = async (name, description, category, price, quantity, imgUrl, createdUserId) => {
    await pool.query(`
        INSERT INTO stocks (name, description, category, price, quantity, imgUrl, createdUserId)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [name, description, category, price, quantity, imgUrl, createdUserId])
}

const deleteStockDb = async (id) => {
    await pool.query(
        `DELETE FROM stocks WHERE id = ?`, [id]
    )
}

const updateStockDb = async (name, description, category, price, quantity, imgUrl, id) => {
    await pool.query(`
        UPDATE stocks
        SET name = ?,
        description = ?,
        category = ? ,
        price = ? ,
        quantity = ? ,
        imgUrl = ? 
        WHERE id = ?`,
        [name, description, category, price, quantity, imgUrl, id])
}

export { getStocksDb, getStocksFromOrderIdDb, getStockDb, insertStockDb, deleteStockDb, updateStockDb }