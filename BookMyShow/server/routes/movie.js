import express from "express";
import { addMovie, getAllMovies, updateMovie, deleteMovie, getMovieById } from "../controller/movie.js";

const movieRouter = express.Router();

movieRouter.post("/", addMovie);
movieRouter.get("/all", getAllMovies);
movieRouter.put("/:id", updateMovie);
movieRouter.delete("/:id", deleteMovie);
movieRouter.get("/:id", getMovieById);

export default movieRouter;

