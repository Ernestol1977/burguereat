import { Router } from "express";
import { getMe, loginUser, registerUser } from "../services/auth.services.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.post("/api/auth/register", registerUser);
router.post("/api/auth/login", loginUser);
router.get("/api/auth/me", verifyToken, getMe);

export default router;
