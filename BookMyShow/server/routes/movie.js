import express from "express";
import { addMovie, getAllMovies, updateMovie, deleteMovie } from "../controller/movie.js";

const movieRouter = express.Router();

movieRouter.post("/add-movie", addMovie);
movieRouter.get("/get-all-movies", getAllMovies);
movieRouter.put("/update-movie", updateMovie);
movieRouter.delete("/delete-movie", deleteMovie);

export default movieRouter;

