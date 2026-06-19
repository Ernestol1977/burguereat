import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import { Order } from "./Order.js";
import { Product } from "./Product.js";

export const OrderItem = sequelize.define(
    "orderItem",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        unitPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        subtotal: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    { timestamps: false },
);

Order.hasMany(OrderItem, { as: "items" });
OrderItem.belongsTo(Order);
Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);
