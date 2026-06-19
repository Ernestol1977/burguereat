import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { createToken } from "../middlewares/verifyToken.js";
import { validateLoginUser, validateRegisterUser } from "../helpers/validations.js";

const cleanUser = (user) => {
    const data = user.toJSON();
    delete data.password;
    return data;
};

export const registerUser = async (req, res) => {
    const result = validateRegisterUser(req.body);

    if (result.error) {
        return res.status(400).send({ message: result.message });
    }

    const { name, lastName, address, phone, email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user) {
        return res.status(400).send({ message: "Usuario existente" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        name,
        lastName,
        address,
        phone,
        email,
        password: hashedPassword,
        role: "usuario",
    });

    res.status(201).json({
        user: cleanUser(newUser),
        token: createToken(newUser),
    });
};

export const loginUser = async (req, res) => {
    const result = validateLoginUser(req.body);

    if (result.error) {
        return res.status(400).send({ message: result.message });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.status(401).send({ message: "Usuario no existente" });
    }

    const comparison = await bcrypt.compare(password, user.password);

    if (!comparison) {
        return res.status(401).send({ message: "Email y/o contraseña incorrecta" });
    }

    res.json({
        user: cleanUser(user),
        token: createToken(user),
    });
};

export const getMe = async (req, res) => {
    res.json({ user: cleanUser(req.user) });
};
