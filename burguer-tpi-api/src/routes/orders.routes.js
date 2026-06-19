import { Router } from "express";
import {
    createOrder,
    deleteOrder,
    findMyOrders,
    findOrders,
    updateOrderStatus,
} from "../services/order.services.js";
import { verifyRole, verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.get("/api/orders", verifyToken, verifyRole("admin", "super-admin"), findOrders);
router.get("/api/orders/my-orders", verifyToken, findMyOrders);
router.post("/api/orders", verifyToken, createOrder);
router.put("/api/orders/:id/status", verifyToken, verifyRole("admin", "super-admin"), updateOrderStatus);
router.delete("/api/orders/:id", verifyToken, verifyRole("admin", "super-admin"), deleteOrder);

export default router;
