import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/database.js";

dotenv.config({
  path: './.env'
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT , () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`http:localhost:${PORT}`);
    });
    
  } catch (error) {
    console.error("Server failed to start." , error.message);
    process.exit(1);
  }
}

startServer();
