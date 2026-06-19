import { Product } from "../models/Product.js";
import { validateProduct } from "../helpers/validations.js";

export const findProducts = async (_req, res) => {
    const products = await Product.findAll({ where: { active: true } });
    res.json(products);
};

export const findProduct = async (req, res) => {
    const product = await Product.findByPk(req.params.id);

    if (!product || !product.active) {
        return res.status(404).send({ message: "Producto no encontrado" });
    }

    res.json(product);
};

export const createProduct = async (req, res) => {
    const result = validateProduct(req.body);

    if (result.error) {
        return res.status(400).send({ message: result.message });
    }

    const product = await Product.create(req.body);
    res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
    const product = await Product.findByPk(req.params.id);

    if (!product || !product.active) {
        return res.status(404).send({ message: "Producto no encontrado" });
    }

    const result = validateProduct(req.body);

    if (result.error) {
        return res.status(400).send({ message: result.message });
    }

    await product.update(req.body);
    res.json(product);
};

export const deleteProduct = async (req, res) => {
    const product = await Product.findByPk(req.params.id);

    if (!product || !product.active) {
        return res.status(404).send({ message: "Producto no encontrado" });
    }

    await product.update({ active: false });
    res.send({ message: "Producto eliminado" });
};
