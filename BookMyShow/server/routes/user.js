import express from "express";
import { register, login, getCurrentUser, forgetPassword, resetPassword } from "../controller/user.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();
console.log("User routes");
router.post("/register", register);
router.post("/login", login);
router.get("/current", authMiddleware, getCurrentUser);
router.patch("/forget-password", forgetPassword);
router.patch("/reset-password/:email", resetPassword);
export default router;