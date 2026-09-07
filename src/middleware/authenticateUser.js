import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    const [scheme, token] = authHeader?.split(" ") ?? [];

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required."
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(
      decoded.userId
    ).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token."
      });
    }

    req.user = user;

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired authentication token."
      });
    }

    next(error);
  }
};

export default authenticateUser;