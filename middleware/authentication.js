import { compare } from "bcrypt"
import { loginUser } from "../model/usersDB.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const checkUser = async(req,res,next)=>{
    const {email,password} = req.body
    let hashedPassword = (await loginUser(email)).password
    
    console.log(hashedPassword);

    try {
        compare(password, hashedPassword, (err, result) => {
            if (err) {
                return res.status(500).send('Internal server error');
            }
            
            if (result) {
                let token = jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: '1h' });
                console.log(token);
                req.body.token = token;
                next();
                return;
            } else {
                res.status(401).send('Your password is incorrect');
            }
        });
    } catch (error) {
        res.status(500).send('An unexpected error occurred');
    }
}
export {checkUser}