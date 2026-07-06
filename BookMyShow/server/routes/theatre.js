import express, { application } from "express";
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";
import { addTheatre, getMyTheatres, getAllTheatres, approveTheatre } from "../controller/theatre.js";

const theatreRouter = express.Router();

theatreRouter.post("/", authMiddleware, addTheatre);
theatreRouter.get("/", authMiddleware, getMyTheatres);
theatreRouter.get("/all", authMiddleware, getAllTheatres);
theatreRouter.put("/approve/:id", authMiddleware, adminMiddleware, approveTheatre);

export default theatreRouter;