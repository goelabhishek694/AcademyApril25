import express from "express";
import { register, login, getCurrentUser } from "../controller/user.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/current", authMiddleware, getCurrentUser);
export default router;