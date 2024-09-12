import { config } from "dotenv";
import pkg from "jsonwebtoken";

const { sign, verify } = pkg;

config();

export function createToken(user) {
  try {
    return sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );
  } catch (error) {
    throw new Error("Token creation failed: " + error.message);
  }
}

export function verifyAToken(req, res, next) {
  try {
    const token = req.cookies["Valid User"];
    if (token) {
      const valid = verify(token, process.env.SECRET_KEY);
      if (valid) {
        req.authenticated = true;
        req.user = valid;
        next();
      } else {
        res.status(401).json({ err: "Invalid token" });
      }
    } else {
      res.status(401).json({ err: "No token provided" });
    }
  } catch (e) {
    res.status(400).json({ err: e.message });
  }
}
