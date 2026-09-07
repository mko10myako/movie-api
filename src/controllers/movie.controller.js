import mongoose from "mongoose";
import Movie from "../models/movie.model.js";

// Create Movie
const createMovie = async (req, res, next) => {
  try {
    const { title, director, year, genre } = req.body;

    const movie = await Movie.create({
      title,
      director,
      year,
      genre,
      createdBy: req.user._id
    });

    return res.status(201).json({
      success: true,
      message: "Movie created successfully.",
      movie
    });

  } catch (error) {
    next(error);
  }
};

// Get All Movies
const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find(
      {createdBy: req.user._id}
    );

    return res.status(200).json({
      success: true,
      count: movies.length,
      movies
    });

  } catch (error) {
    next(error);
  }
};

// Get Movie By Id
const getMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Movie Id."
      });
    }

    const movie = await Movie.findOne({
        _id: id,
        createdBy: req.user._id
      });

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found."
      });
    }

    return res.status(200).json({
      success: true,
      movie
    });

  } catch (error) {
    next(error);
  }
};

// Update Movie
const updateMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Movie Id."
      });
    }

    // Find the movie before updating it
    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found."
      });
    }

    // Check whether the logged-in user created this movie
    if (
      !movie.createdBy ||
      !movie.createdBy.equals(req.user._id)
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this movie."
      });
    }

    const { title, director, year, genre } = req.body;

    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      {
        title,
        director,
        year,
        genre
      },
      {
        new: true,
        runValidators: true
      }
    );

    return res.status(200).json({
      success: true,
      message: "Movie updated successfully.",
      movie: updatedMovie
    });
  } catch (error) {
    next(error);
  }
};

// Delete Movie
const deleteMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Movie Id."
      });
    }

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found."
      });
    }

    // Check ownership
    if (
      !movie.createdBy ||
      !movie.createdBy.equals(req.user._id)
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this movie."
      });
    }


    const deletedMovie = await Movie.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Movie deleted successfully.",
      movie: deletedMovie
    });

  } catch (error) {
    next(error);
  }
};

export {
  createMovie,
  getMovies,
  getMovieById,
  updateMovieById,
  deleteMovieById
};