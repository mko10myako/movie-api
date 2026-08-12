import express from "express";

import {
  createMovie,
  getMovies,
  getMovieById,
  updateMovieById,
  deleteMovieById
}  from "../controllers/movie.controller.js";

import { validateCreateMovie } from "../middleware/validateCreateMovie.js";
import { validateUpdateMovie } from "../middleware/validateUpdateMovie.js";
  
const router = express.Router();

router.post('/', validateCreateMovie, createMovie);
router.get('/', getMovies);
router.get('/:id', getMovieById);
router.put('/:id', validateUpdateMovie , updateMovieById);
router.delete('/:id', deleteMovieById);

export default router;