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
import authenticateUser from "../middleware/authenticateUser.js";
  
const router = express.Router();

router.post('/', authenticateUser, validateCreateMovie, createMovie);
router.get('/', authenticateUser, getMovies);
router.get('/:id', authenticateUser, getMovieById);
router.put('/:id', authenticateUser, validateUpdateMovie , updateMovieById);
router.delete('/:id', authenticateUser, deleteMovieById);

export default router;