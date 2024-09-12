import {createPool} from 'mysql2/promise'
import {config} from 'dotenv'

config()

const pool =createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
})

const getOrdersDb = async()=>{
    let [data] = await pool.query('SELECT * FROM orders')
    return data;
}



const getOrderDb = async (id) =>{
    let [[data]] = await pool.query('SELECT * FROM orders WHERE id = ?', [id])
    return data;
}


const placeOrderDb = async(userId, date, priceTotal) =>{
    await pool.query(`
        INSERT INTO orders (userId, date, priceTotal)
        VALUES (?, ?, ?)
        `, 
        [userId, date, priceTotal])
}

const deleteOrderDb = async(id) => {
    await pool.query(
        `DELETE FROM orderItems WHERE orderId = ?`, [id]
    );

    await pool.query(
        `DELETE FROM orders WHERE id = ?`, [id]
    );
};

const updateOrderDb = async(priceTotal, id) =>{
    await pool.query(`
        UPDATE orders
        SET priceTotal = ?
        WHERE id = ?`, 
        [priceTotal, id])
}

export {getOrdersDb, getOrderDb, placeOrderDb, deleteOrderDb, updateOrderDb}