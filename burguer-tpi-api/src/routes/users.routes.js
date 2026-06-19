import { Router } from "express";
import {
    createUser,
    deleteUser,
    findUser,
    findUsers,
    updateUser,
    updateUserRole,
} from "../services/user.services.js";
import { verifyRole, verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.get("/api/users", verifyToken, verifyRole("super-admin"), findUsers);
router.get("/api/users/:id", verifyToken, verifyRole("super-admin"), findUser);
router.post("/api/users", verifyToken, verifyRole("super-admin"), createUser);
router.put("/api/users/:id", verifyToken, verifyRole("super-admin"), updateUser);
router.put("/api/users/:id/role", verifyToken, verifyRole("super-admin"), updateUserRole);
router.delete("/api/users/:id", verifyToken, verifyRole("super-admin"), deleteUser);

export default router;
