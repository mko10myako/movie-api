import { allowedGenres } from "../models/movie.model.js";

const validateUpdateMovie = (req, res, next) => {
  const { title, director, year, genre } = req.body;

  // Validate title if provided
  if (title !== undefined) {
    if (typeof title !== "string") {
      return res.status(400).json({
        success: false,
        message: "Title must be a string."
      });
    }

    const formattedTitle = title.trim();

    if (!formattedTitle) {
      return res.status(400).json({
        success: false,
        message: "Title cannot be empty."
      });
    }

    req.body.title = formattedTitle;
  }

  // Validate director if provided
  if (director !== undefined) {
    if (typeof director !== "string") {
      return res.status(400).json({
        success: false,
        message: "Director must be a string."
      });
    }

    const formattedDirector = director.trim();

    if (!formattedDirector) {
      return res.status(400).json({
        success: false,
        message: "Director cannot be empty."
      });
    }

    req.body.director = formattedDirector;
  }

  // Validate year if provided
  if (year !== undefined) {
    const yearNumber = Number(year);

    if (Number.isNaN(yearNumber)) {
      return res.status(400).json({
        success: false,
        message: "Year must be a valid number."
      });
    }

    if (!Number.isInteger(yearNumber)) {
      return res.status(400).json({
        success: false,
        message: "Year must be a whole number."
      });
    }

    const currentYear = new Date().getFullYear();

    if (yearNumber < 1888 || yearNumber > currentYear) {
      return res.status(400).json({
        success: false,
        message: `Year must be between 1888 and ${currentYear}.`
      });
    }

    req.body.year = yearNumber;
  }

  // Validate genre if provided
  if (genre !== undefined) {
    if (typeof genre !== "string") {
      return res.status(400).json({
        success: false,
        message: "Genre must be a string."
      });
    }

    const formattedGenre = genre.trim();

    if (!formattedGenre) {
      return res.status(400).json({
        success: false,
        message: "Genre cannot be empty."
      });
    }

    if (!allowedGenres.includes(formattedGenre)) {
      return res.status(400).json({
        success: false,
        message: `Genre must be one of: ${allowedGenres.join(", ")}`
      });
    }

    req.body.genre = formattedGenre;
  }

  next();
};

export { validateUpdateMovie };