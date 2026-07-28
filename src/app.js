import express from "express";
import movieRoutes from "./routes/movie.route.js";

const app = express();

app.use(express.json());

app.get("/", (res , req) => {
  res.status(200).json({
    sucess : true,
    message: "Movie API is running."
  });
});

app.use("/api/v1/movies" , movieRoutes);

export default app;