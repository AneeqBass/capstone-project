import {createPool} from 'mysql2/promise'
import {config} from 'dotenv'

config()

const pool =createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
})

const getUsers = async()=>{
    const [data] = await pool.query('SELECT * FROM users')
    return data
}

const getUser = async(id) =>{
    const [[data]] = await pool.query('SELECT * FROM users WHERE id = ?', [id])
    return data
}

const loginUser = async(email) =>{
    const [[data]] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
    return data
}

const insertUser = async(name, surname, gender, email, password, imgUrl) =>{
    await pool.query(`
        INSERT INTO users (name, surname, gender, email, password, imgUrl)
        VALUES (?,?,?,?,?,?)
        `, [name, surname, gender, email, password, imgUrl])
}

const deleteUser = async(id) =>{
    await pool.query(`DELETE FROM users WHERE id = ?`, [id])
}

const updateUser = async(name, surname, gender, email, password, imgUrl, id) =>{
    await pool.query(`
        UPDATE users
        SET name = ? ,
        surname = ?, 
        gender = ? ,
        email = ? ,
        password = ? ,
        imgUrl = ? 
        WHERE id = ?`,
    [name, surname, gender, email, password, imgUrl, id])
}

export {getUsers, getUser, insertUser, deleteUser, updateUser, loginUser}