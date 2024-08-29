import {getUsers, getUser, insertUser, deleteUser, updateUser} from '../model/usersDB.js'
import { hash } from 'bcrypt'

const fetchUsers = async(req,res) =>{
    res.json(await getUsers())
}

const fetchUser = async(req,res)=>{
    res.json(await getUser(req.params.id))
}

const insertUser = async (req, res) => {
    try {
        let { name, surname, gender, email, password, userPass, userProfile } = req.body;

        hash(userPass, 10, async (err, hashedP) => {
            if (err) {
                return res.status(404).send('Error with password');
            }
            try {
                await insertUser(name, surname, gender, email, password, hashedP, userProfile);
                res.status(200).send('User was registered successfully');
            } catch (dbError) {
                res.status(404).send('Error while registering user');
            }
        });
    } catch (error) {
        res.status(500).send('An error occurred while processing your request');
    }
};

const deleteUser = async(req,res)=>{
    await deleteUser(req.params.id)
    res.status(200).send('User was deleted successfully')
}

const updateUser = async (req, res) => {
    try {
        let { name, surname, gender, email, password, imgUrl, userProfile } = req.body;
        let user = await getUser(req.params.id);

        name?name=name:name = user.name
        surname?surname=surname:surname = user.surname
        gender?gender=gender:gender = user.gender
        email?email=email:email = user.email
        password?password=password:password = user.password
        imgUrl?imgUrl=imgUrl:imgUrl = user.imgUrl
        userProfile?userProfile=userProfile:userProfile = user.userProfile

       
        if (userPass) {
            hash(userPass, 10, async (err, hashedP) => {
                if (err) {
                    return res.status(404).send('Error with password');
                }
                userPass = hashedP; 
                await updateUserDb(name, surname, gender, email, password, userPass, userProfile, req.params.id);
                return res.status(200).send('User was updated successfully');
            });
        } else {
        
            userPass = users.userPass;
            await updateUserDb(name, surname, gender, email, password, userPass, userProfile, req.params.id);
            res.status(200).send('User was updated successfully');
        }
    } catch (error) {
        res.status(404).send('An error occurred while updating the user');
    }
};

const loginUser = async(req,res)=>{
    res.json({message:"You have logged in successfully", token:req.body.token})
};




export{fetchUsers,fetchUser,insertUser,deleteUser,updateUser,loginUser}