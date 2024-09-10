import {createPool} from 'mysql2/promise'
import {config} from 'dotenv'

config()

const pool =createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
})

const getUsersDb = async()=>{
    const [data] = await pool.query('SELECT * FROM users')
    return data
}

const getUserDb = async(id) =>{
    const [[data]] = await pool.query('SELECT * FROM users WHERE id = ?', [id])
    return data
}

const loginUserDb = async(email) =>{
    const [[data]] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
    return data
}

const insertUserDb = async(name, surname, gender, email, password, imgUrl) =>{
    await pool.query(`
        INSERT INTO users (name, surname, gender, email, password, imgUrl)
        VALUES (?,?,?,?,?,?)
        `, [name, surname, gender, email, password, imgUrl])
}

const deleteUserDb = async(id) =>{
    await pool.query(`DELETE FROM users WHERE id = ?`, [id])
}

const updateUserDb = async(name, surname, gender, email, password, imgUrl, role, id) =>{
    await pool.query(`
        UPDATE users
        SET name = ? ,
        surname = ?, 
        gender = ? ,
        email = ? ,
        password = ? ,
        imgUrl = ? ,
        role = ?
        WHERE id = ?`,
    [name, surname, gender, email, password, imgUrl, role, id])
}


export { getUsersDb, getUserDb, insertUserDb, deleteUserDb, updateUserDb, loginUserDb };