import express from "express";
import movieRoutes from "./routes/movie.route.js";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.route.js";

const app = express();

app.use(express.json());

app.get("/", (req , res) => {
  res.status(200).json({
    sucess : true,
    message: "Movie API is running."
  });
});

app.use("/api/v1/movies" , movieRoutes);
app.use("/api/v1/auth" , authRoutes);

// Error-handling middleware (ALWAYS LAST)
app.use(errorHandler);

export default app;