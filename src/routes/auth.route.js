import express from "express";
import { registerUser,
         loginUser,
         getProfile
} from "../controllers/auth.controller.js";

import authenticateUser from "../middleware/authenticateUser.js"

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticateUser, getProfile);


export default router;