import Movie from "../models/movie.model.js";

// Create a movie
const createMovie = async (req, res) => {
  try {
    const { title, director, year, genre } = req.body;

    if (!title || !director || !year) {
      return res.status(400).json({
        message : "Title, director and year fields are required."
      });
    }

    const movie = await Movie.create({
      title,
      director,
      year,
      genre
    });

    return res.status(200).json({
      message : "Movie created sucessfully",
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
        new : true,
        runValidators: true
      }
    );

    if(!updatedMovie){
      return res.status(404).jason({
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
};

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