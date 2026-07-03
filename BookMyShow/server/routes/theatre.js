import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { addTheatre, getMyTheatres, getAllTheatres } from "../controller/theatre.js";

const theatreRouter = express.Router();

theatreRouter.post("/", authMiddleware, addTheatre);
theatreRouter.get("/", authMiddleware, getMyTheatres);
theatreRouter.get("/all", authMiddleware, getAllTheatres);

export default theatreRouter;