import cors from "cors";
import express from "express";
import { QueryTypes } from "sequelize";
import { seedDatabase } from "./src/helpers/seed.js";
// import { sequelize } from "./src/models/index.js";
import { sequelize } from "./src/database/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import orderRoutes from "./src/routes/orders.routes.js";
import productsRoutes from "./src/routes/products.routes.js";
import usersRoutes from "./src/routes/users.routes.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
    res.json({ status: "ok", message: "BurgerEat API running" });
});

app.use(authRoutes);
app.use(productsRoutes);
app.use(usersRoutes);
app.use(orderRoutes);

app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

app.use((err, req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
});

async function ensureOrderCreatedAtColumn() {
    const columns = await sequelize.query("PRAGMA table_info(`orders`)", {
        type: QueryTypes.SELECT,
    });
    const tableExists = columns.length > 0;
    const hasCreatedAt = columns.some((column) => column.name === "createdAt");

    if (tableExists && !hasCreatedAt) {
        await sequelize.query("ALTER TABLE `orders` ADD COLUMN `createdAt` DATETIME");
        await sequelize.query(
            "UPDATE `orders` SET `createdAt` = CURRENT_TIMESTAMP WHERE `createdAt` IS NULL",
        );
    }
}

async function start() {
    try {
        await sequelize.authenticate();
        await ensureOrderCreatedAtColumn();
        await sequelize.sync();
        await seedDatabase();

        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("No se pudo iniciar la API:", error);
        process.exit(1);
    }
}

start();
