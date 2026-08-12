import express from "express";
import movieRoutes from "./routes/movie.route.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());

app.get("/", (res , req) => {
  res.status(200).json({
    sucess : true,
    message: "Movie API is running."
  });
});

app.use("/api/v1/movies" , movieRoutes);

// Error-handling middleware (ALWAYS LAST)
app.use(errorHandler);

export default app;