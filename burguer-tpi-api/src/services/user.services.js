import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { validateRegisterUser } from "../helpers/validations.js";

const cleanUser = (user) => {
    const data = user.toJSON();
    delete data.password;
    return data;
};

export const findUsers = async (_req, res) => {
    const users = await User.findAll();
    res.json(users.map(cleanUser));
};

export const findUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado" });
    }

    res.json(cleanUser(user));
};

export const createUser = async (req, res) => {
    const result = validateRegisterUser(req.body);

    if (result.error) {
        return res.status(400).send({ message: result.message });
    }

    const { name, lastName, address, phone, email, password, role = "usuario" } = req.body;
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
        return res.status(400).send({ message: "Usuario existente" });
    }

    if (!["super-admin", "admin", "usuario"].includes(role)) {
        return res.status(400).send({ message: "Rol invalido" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        lastName,
        address,
        phone,
        email,
        password: hashedPassword,
        role,
    });

    res.status(201).json(cleanUser(user));
};

export const updateUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado" });
    }

    const { name, lastName, address, phone, email, role } = req.body;
    await user.update({ name, lastName, address, phone, email, role });

    res.json(cleanUser(user));
};

export const updateUserRole = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    const { role } = req.body;

    if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado" });
    }

    if (!["super-admin", "admin", "usuario"].includes(role)) {
        return res.status(400).send({ message: "Rol invalido" });
    }

    await user.update({ role });
    res.json(cleanUser(user));
};

export const deleteUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado" });
    }

    await user.destroy();
    res.send({ message: "Usuario eliminado" });
};
