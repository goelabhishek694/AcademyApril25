import express from 'express';
const router = express.Router();
import { getAllMovies, getMovieById, createMovie, putMovie, patchMovie } from '../controllers/movie.js';

router.get('/', getAllMovies);
router.post("/", createMovie);
router.get("/:id", getMovieById);
router.put("/:id", putMovie);
router.patch("/:id", patchMovie);

export default router;