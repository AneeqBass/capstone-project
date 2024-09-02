import {createPool} from 'mysql2/promise'
import {config} from 'dotenv'

config()

const pool =createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
})

const getEquipmentsDb = async()=>{
    let [data] = await pool.query('SELECT * FROM equipment')
    return data;
}



const getEquipmentDb = async (id) =>{
    let [[data]] = await pool.query('SELECT * FROM equipment WHERE id = ?', [id])
    return data;
}


const insertEquipmentDb = async(name, price, quantity, quantityDueMaintenance, imgUrl, createdUserId) =>{
    await pool.query(`
        INSERT INTO equipment (name, price, quantity, quantityDueMaintenance, imgUrl, createdUserId)
        VALUES (?, ?, ?, ?, ?, ?)
        `, [name, price, quantity, quantityDueMaintenance, imgUrl, createdUserId])
}


const deleteEquipmentDb = async(id) =>{
    await pool.query(
        `DELETE FROM equipment WHERE id = ?`, [id]
    )
}

const updateEquipmentDb = async(name, price, quantity, quantityDueMaintenance, imgUrl, id) =>{
    await pool.query(`
        UPDATE equipment
        SET name = ?,
        price = ? ,
        quantity = ? ,
        quantityDueMaintenance = ? ,
        imgUrl = ? 
        WHERE id = ?`, 
        [name, price, quantity, quantityDueMaintenance, imgUrl, id])

}

export {getEquipmentsDb, getEquipmentDb, insertEquipmentDb, deleteEquipmentDb, updateEquipmentDb}