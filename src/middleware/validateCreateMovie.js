import { allowedGenres } from "../models/movie.model.js";

const validateCreateMovie = (req, res, next) => {
  const { title, director, year, genre } = req.body;

  // Check required fields
  if (
    typeof title !== "string" ||
    !title.trim() ||
    typeof director !== "string" ||
    !director.trim() ||
    !String(year ?? "").trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "Title, director, and year are required."
    });
  }

  // Trim title and director
  req.body.title = title.trim();
  req.body.director = director.trim();

  // Validate year
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

  // Replace original year with validated number
  req.body.year = yearNumber;

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

export { validateCreateMovie };