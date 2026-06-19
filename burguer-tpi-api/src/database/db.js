import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./src/database/burgereat.sqlite",
    logging: false,
});
