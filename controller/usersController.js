import {getUsersDb, getUserDb, insertUserDb, deleteUserDb, updateUserDb, loginUserDb} from '../model/usersDB.js'
import { hash } from 'bcrypt'

const fetchUsers = async(req,res) =>{
    res.json(await getUsersDb())
}

const fetchUser = async(req,res)=>{
    res.json(await getUserDb(req.params.id))
}

const insertUser = async (req, res) => {
    try {
        let { name, surname, gender, email, password, imgUrl } = req.body;

        hash(password, 10, async (err, hashedP) => {
            if (err) {
                return res.status(401).send('Error with password');
            }
            try {
                await insertUserDb(name, surname, gender, email, hashedP, imgUrl);
                res.status(200).send('User was registered successfully');
            } catch (dbError) {
                res.status(500).send('Error while registering user');
            }
        });
    } catch (error) {
        res.status(500).send('An error occurred while processing your request');
    }
};

const deleteUser = async(req,res)=>{
    await deleteUserDb(req.params.id)
    res.status(200).send('User was deleted successfully')
}

const updateUser = async (req, res) => {
    try {
        let { name, surname, gender, email, password, imgUrl, role } = req.body;
        let user = await getUserDb(req.params.id);

        name?name=name:name = user.name
        surname?surname=surname:surname = user.surname
        gender?gender=gender:gender = user.gender
        email?email=email:email = user.email
        password?password=password:password = user.password
        imgUrl?imgUrl=imgUrl:imgUrl = user.imgUrl
        role?role=role:role = user.role

        if (password) {
            hash(password, 10, async (err, hashedP) => {
                if (err) {
                    return res.status(404).send('Error with password');
                }
                password = hashedP; 
                await updateUserDb(name, surname, gender, email, hashedP, imgUrl, role, req.params.id);
                return res.status(200).send('User was updated successfully');
            });
        } else {
            password = user.password;
            await updateUserDb(name, surname, gender, email, password, imgUrl, role, req.params.id);
            res.status(200).send('User was updated successfully');
        }
    } catch (error) {
        res.status(404).send('An error occurred while updating the user');
    }
};

const loginUser = async (req, res) => {
    const token = req.body.token;
    res.json({ message: "Login successful", token });
};

const getCurrentUser = async (req, res) => {
    try {
      const email = req.user.email; 
      const user = await loginUserDb(email);
  
      if (user) {
        res.json(user);
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      res.status(500).send('An error occurred while fetching the user');
    }
  };


  export { fetchUsers, fetchUser, insertUser, deleteUser, updateUser, loginUser, getCurrentUser };