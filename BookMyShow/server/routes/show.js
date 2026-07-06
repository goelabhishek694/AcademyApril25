import express from "express";
import { addShow, getShowsByMovieAndDate, getShowsByTheatre } from "../controller/show.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

//add a validation middleware before adding anythign to db . 
router.post("/", authMiddleware, addShow);
router.get("/by-movie-date", authMiddleware, getShowsByMovieAndDate);
router.get("/by-theatre", authMiddleware, getShowsByTheatre);

export default router;