import { Order } from "../models/Order.js";
import { OrderItem } from "../models/OrderItem.js";
import { Product } from "../models/Product.js";
import { User } from "../models/User.js";
import { validateOrderItems } from "../helpers/validations.js";
import { Op } from "sequelize";

export const findOrders = async (req, res) => {
    const { userId, status, from, to } = req.query;
    const where = {};

    if (userId) {
        where.userId = userId;
    }

    if (status) {
        where.status = status;
    }

    if (from || to) {
        where.createdAt = {};

        if (from) {
            where.createdAt[Op.gte] = new Date(from);
        }

        if (to) {
            const toDate = new Date(to);
            toDate.setHours(23, 59, 59, 999);
            where.createdAt[Op.lte] = toDate;
        }
    }

    const orders = await Order.findAll({
        where,
        include: [
            { model: User, attributes: { exclude: ["password"] } },
            { model: OrderItem, as: "items" },
        ],
        order: [["createdAt", "DESC"]],
    });

    res.json(orders);
};

export const findMyOrders = async (req, res) => {
    const orders = await Order.findAll({
        where: { userId: req.user.id },
        include: [{ model: OrderItem, as: "items" }],
        order: [["createdAt", "DESC"]],
    });

    res.json(orders);
};

export const createOrder = async (req, res) => {
    const { items } = req.body;
    const validation = validateOrderItems(items);

    if (validation.error) {
        return res.status(400).send({ message: validation.message });
    }

    const orderItems = [];

    for (const item of items) {
        const product = await Product.findByPk(item.productId);

        if (!product || !product.active) {
            return res.status(404).send({ message: "Producto no encontrado" });
        }

        const quantity = Number(item.quantity);
        const subtotal = product.price * quantity;

        orderItems.push({
            product,
            quantity,
            subtotal,
        });
    }

    const total = orderItems.reduce((acc, item) => acc + item.subtotal, 0);
    const order = await Order.create({ userId: req.user.id, total });

    for (const item of orderItems) {
        await OrderItem.create({
            orderId: order.id,
            productId: item.product.id,
            productName: item.product.name,
            quantity: item.quantity,
            unitPrice: item.product.price,
            subtotal: item.subtotal,
        });
    }

    const createdOrder = await Order.findByPk(order.id, {
        include: [{ model: OrderItem, as: "items" }],
    });

    res.status(201).json(createdOrder);
};

export const updateOrderStatus = async (req, res) => {
    const order = await Order.findByPk(req.params.id);
    const { status } = req.body;

    if (!order) {
        return res.status(404).send({ message: "Pedido no encontrado" });
    }

    if (!["pendiente", "preparando", "entregado", "cancelado"].includes(status)) {
        return res.status(400).send({ message: "Estado invalido" });
    }

    await order.update({ status });
    res.json(order);
};

export const deleteOrder = async (req, res) => {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
        return res.status(404).send({ message: "Pedido no encontrado" });
    }

    await OrderItem.destroy({ where: { orderId: order.id } });
    await order.destroy();
    res.send({ message: "Pedido eliminado" });
};
