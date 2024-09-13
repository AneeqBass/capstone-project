import { createPool } from 'mysql2/promise'
import { config } from 'dotenv'

config()

const pool = createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
})

const getOrderItemsDb = async (id) => {
    let [data] = await pool.query('SELECT * FROM orderItems where orderId = ?', [id])
    return data;
} 

const getOrderItemDb = async (orderId, stockId) => { 
    let [data] = await pool.query(`
        SELECT * 
        FROM orderItems 
        WHERE orderId = ? AND stockId = ?  
        `, [orderId, stockId])  
    return data;
};

const placeOrderItemDb = async (orderId, stockId, quantity, price, priceTotal) => {
    await pool.query(` 
        INSERT INTO orderItems (orderId, stockId, quantity, price, priceTotal)
        VALUES (?, ?, ?, ?, ?)
        `,
        [orderId, stockId, quantity, price, priceTotal])
}

const deleteOrderItemDb = async (id) => {
    await pool.query(
        `DELETE FROM orderItems WHERE id = ?`, [id]
    )
}

const updateOrderItemDb = async (quantity, priceTotal, id) => {
    await pool.query(`
        UPDATE orderItems
        SET quantity = ?,
        priceTotal = ?
        WHERE id = ?`,
        [quantity, priceTotal, id])
}

export { getOrderItemsDb, getOrderItemDb, placeOrderItemDb, deleteOrderItemDb, updateOrderItemDb }