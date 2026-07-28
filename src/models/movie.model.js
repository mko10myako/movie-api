import mongoose from "mongoose";

const allowedGenres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller"
];


const movieSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String
  },

  director: {
    required: true,
    type: String
  },

  year: {
    required: true,
    type: Number
  },

  genre: {
    type: String,
    enum: allowedGenres
  }

},

{
  timestamps : true
});

const Movie = mongoose.model("Movie" , movieSchema); 

export default Movie;