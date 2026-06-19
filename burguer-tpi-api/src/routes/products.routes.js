import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    findProduct,
    findProducts,
    updateProduct,
} from "../services/product.services.js";
import { verifyRole, verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.get("/api/products", findProducts);
router.get("/api/products/:id", findProduct);
router.post("/api/products", verifyToken, verifyRole("admin", "super-admin"), createProduct);
router.put("/api/products/:id", verifyToken, verifyRole("admin", "super-admin"), updateProduct);
router.delete("/api/products/:id", verifyToken, verifyRole("admin", "super-admin"), deleteProduct);

export default router;
