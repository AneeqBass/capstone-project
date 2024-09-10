import { compare } from "bcrypt";
import { loginUserDb } from "../model/usersDB.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const checkUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await loginUserDb(email);

        if (!user) {
            return res.status(401).send("User not found");
        }

        compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).send("Internal server error");
            }

            if (result) {
                const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "1h" });
                req.body.token = token;
                next();
            } else {
                res.status(401).send("Incorrect password");
            }
        });
    } catch (error) {
        res.status(500).send("An unexpected error occurred");
    }
};

export { checkUser };
