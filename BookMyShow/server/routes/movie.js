import express from "express";
import { addMovie, getAllMovies, updateMovie, deleteMovie } from "../controller/movie.js";

const movieRouter = express.Router();

movieRouter.post("/", addMovie);
movieRouter.get("/all", getAllMovies);
movieRouter.put("/:id", updateMovie);
movieRouter.delete("/:id", deleteMovie);

export default movieRouter;

