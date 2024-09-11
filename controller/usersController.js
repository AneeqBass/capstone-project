import { getUsersDb, getUserDb, insertUserDb, deleteUserDb, updateUserDb, loginUserDb } from '../model/usersDB.js';
import { hash, compare } from 'bcrypt';
import jwt from "jsonwebtoken";

const fetchUsers = async (req, res) => {
    res.json(await getUsersDb());
};

const fetchUser = async (req, res) => {
    res.json(await getUserDb(req.params.id));
};

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

const deleteUser = async (req, res) => {
    await deleteUserDb(req.params.id);
    res.status(200).send('User was deleted successfully');
};

const updateUser = async (req, res) => {
    try {
        let { name, surname, gender, email, password, imgUrl, role } = req.body;
        let user = await getUserDb(req.params.id);

        name = name || user.name;
        surname = surname || user.surname;
        gender = gender || user.gender;
        email = email || user.email;
        imgUrl = imgUrl || user.imgUrl;
        role = role || user.role;

        if (password) {
            hash(password, 10, async (err, hashedP) => {
                if (err) {
                    return res.status(404).send('Error with password');
                }
                await updateUserDb(name, surname, gender, email, hashedP, imgUrl, role, req.params.id);
                return res.status(200).send('User was updated successfully');
            });
        } else {
            await updateUserDb(name, surname, gender, email, user.password, imgUrl, role, req.params.id);
            res.status(200).send('User was updated successfully');
        }
    } catch (error) {
        res.status(404).send('An error occurred while updating the user');
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await loginUserDb(email);
        if (!user) {
            return res.status(401).json({ msg: "User not found" });
        }

        const isPasswordMatch = await compare(password, user.password); 
        if (!isPasswordMatch) {
            return res.status(401).json({ msg: "Invalid password" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, {
            expiresIn: "7d",
        });

        res.status(200).json({
            msg: "Login successful",
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                surname: user.surname,
                role: user.role,
            }
        });
    } catch (error) {
        res.status(500).json({ msg: "Login failed", error: error.message });
    }
};

export { fetchUsers, fetchUser, insertUser, deleteUser, updateUser, loginUser };
