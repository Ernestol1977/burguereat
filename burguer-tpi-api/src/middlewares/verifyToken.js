import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const secretKey = "burgereat-secret";

export const createToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, secretKey, {
        expiresIn: "2h",
    });
};

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
        return res.status(401).send({ message: "Token requerido" });
    }

    try {
        const payload = jwt.verify(token, secretKey);
        const user = await User.findByPk(payload.id);

        if (!user) {
            return res.status(401).send({ message: "Usuario no encontrado" });
        }

        req.user = user;
        next();
    } catch {
        return res.status(401).send({ message: "Token invalido" });
    }
};

export const verifyRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).send({ message: "No tenes permisos" });
        }

        next();
    };
};
