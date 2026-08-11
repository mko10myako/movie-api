import mongoose from "mongoose";
import Movie , { allowedGenres } from "../models/movie.model.js";

// Create a movie
const createMovie = async (req, res) => {
  try {
    const { title, director, year, genre } = req.body;

    // Checking required field
    if (
      !title?.trim() ||
      !director?.trim() || 
      !String(year ?? "").trim() 
    )
      {
      return res.status(400).json({
        success: false,
        message: "Title, director, and year are required."
      });
    }

    // Check whether year is a valid number
    const yearNumber = Number(year);

    if(Number.isNaN(yearNumber)){
      return res.status(400).json({
        success: false,
        message: "Year must be a valid number."
      });
    }

    //Check whether year is a whole number
    if (!Number.isInteger(yearNumber)) {
      return res.status(400).json({
        success: false,
        message: "Year must be a whole number."
      });
    }

    // Check the year range
    const currentYear = new Date().getFullYear();

    if (yearNumber < 1888 || yearNumber > currentYear){
      return res.status(400).json({
        success: false,
        message: `Year must be in between 1888 and ${currentYear}.`
      });
    }

    // Validate Genre


    if (genre !== undefined) {

      if (typeof genre !== "string") {
        return res.status(400).json({
          success: false,
          message: "Genre must be a string."
        });
      }

      let formattedGenre = genre.trim();

      if (!allowedGenres.includes(formattedGenre)) {
        return res.status(400).json({
          success: false,
          message: `Genre must be one of: ${allowedGenres.join(", ")}`
        });
      }
    }

    const movie = await Movie.create({
      title: title.trim(),
      director: director.trim(),
      year: yearNumber,
      genre: genre?.trim()
    });

    return res.status(200).json({
      success: true,
      message: "Movie created sucessfully",
      movie
    })
  } catch (error) {
    return res.status(500).json({
     success: false,
      message: "Internal server error.",
      error: error.message
    });
  }
};

// GET all movies

const getMovies = async (req, res) => {
  try{
    const movies = await Movie.find();

    return res.status(200).json({
      success : true,
      count : movies.length,
      movies
    });
  } 
  catch(error){
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message
    });
  }
};

//Get one movie

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success: false,
        message: "Invalid Movie Id"
      });
    }

    const movie = await Movie.findById(id);

    if(!movie){
      return res.staus(404).json({
        success: false,
        message: "Movie not found.",
      });
    }

    return res.status(200).json({
      success: true,
      movie
    });
  } 
  catch(error){
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message
    });
  }
};

// Update a movie

const updateMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success: false,
        message: "Invalid Movie Id"
      });
    }
     
    const { title, director, year, genre } = req.body;

    // validate title
    if(title !== undefined){
      const formattedTitle = title.trim();

    if (typeof title !== "string") {
      return res.status(400).json({
        success: false,
        message: "Title must be a string."
      });
    }

      if(!formattedTitle)
        return res.status(400).json({
        success: false,
        message: "Title cannot be empty."
      })

    req.body.title = formattedTitle;
    }                                 

    // validate director
   if(director !== undefined){
      const formattedDirector = title.trim();


   if (typeof director !== "string") {
    return res.status(400).json({
      success: false,
      message: "Director must be a string."
    });
  }

    if(!formattedDirector)
      return res.status(400).json({
      success: false,
      message: "Director cannot be empty."
    })

    req.body.title = formattedDirector;
   }

    // validate year
   
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

  // Replace the original value with the validated number
  req.body.year = yearNumber;
     }
  }
  // Validate genre
  if(genre !== undefined){
    const formattedGenre = genre.trim();

    if(typeof formattedGenre !== "string"){
      return res.status(400).json({
        success: false,
        message: "Genre must be a string."
    })
  }

  if(!formattedGenre){
    return res.status(400).json({
        success: false,
        message: "Genre cannot be empty." 
      })
  }
  }

  const updatedMovie = await Movie.findByIdAndUpdate(
    id,
    {
      title,
      director,
      year,
      genre
    },
    {
      new : true,
      runValidators: true
    }
  );

  if(!updatedMovie){
    return res.status(404).json({
      sucess : false,
      message : "Movie not found."
    });
  };

  return res.status(200).json({
    success: true,
    message: "Movie updated successfully.",
    movie : updatedMovie
  });

  } catch (error) {
  return res.status(500).json({
    success: false,
    message: "Internal server error.",
    error: error.message
  });
  }
  
}

//delete a movie

const deleteMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMovie = await Movie.findByIdAndDelete(id);

    if(!deletedMovie){
      return res.status(404).json({
        success : false,
        message : "Moive not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Movie deleted successfully.",
      movie: deletedMovie
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message
    });
  }
}

export { 
  createMovie,
  getMovies,
  getMovieById,
  updateMovieById,
  deleteMovieById
 };