import express from "express";

import {
  createMovie,
  getMovies,
  getMovieById,
  updateMovieById,
  deleteMovieById
}  from "../controllers/movie.controller.js";
  
const router = express.Router();

router.post('/', createMovie);
router.get('/', getMovies);
router.get('/:id', getMovieById);
router.put('/:id', updateMovieById);
router.delete('/:id', deleteMovieById);

export default router;