import {createPool} from 'mysql2/promise'
import {config} from 'dotenv'

config()

const pool =createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
})

const getSupplementsDb = async()=>{
    let [data] = await pool.query('SELECT * FROM supplements')
    return data;
}



const getSupplementDb = async (id) =>{
    let [[data]] = await pool.query('SELECT * FROM supplements WHERE id = ?', [id])
    return data;
}


const insertSupplementDb = async(name, description, category, price, quantity, imgUrl, createdUserId) =>{
    await pool.query(`
        INSERT INTO supplements (name, description, category, price, quantity, imgUrl, createdUserId)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `, 
        [name, description, category, price, quantity, imgUrl, createdUserId])
}

const deleteSupplementDb = async(id) =>{
    await pool.query(
        `DELETE FROM supplements WHERE id = ?`, [id]
    )
}

const updateSupplementDb = async(name, description, category, price, quantity, imgUrl, id) =>{
    await pool.query(`
        UPDATE supplements
        SET name = ?,
        description = ?,
        category = ? ,
        price = ? ,
        quantity = ? ,
        imgUrl = ? 
        WHERE id = ?`, 
        [name, description, category, price, quantity, imgUrl, id])
}

export {getSupplementsDb, getSupplementDb, insertSupplementDb, deleteSupplementDb, updateSupplementDb}