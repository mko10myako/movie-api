
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";


const registerUser = async (req, res, next) => {
  try {

    const { name, email, password } = req.body;

    const exitingUser = await User.findOne({ email });

    if(exitingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered."
      });
    };
    
    const user = await User.create({
      name,
      email,
      password
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch(error) {
    next(error);
  }
}

const loginUser = async (req, res, next) => {
  try {

  const { email, password } = req.body;

  if (!email || !password){
    return res.status(400).json({
      success: false,
      message: "Email and password are required."
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

   const passwordMatches = await user.comparePassword(password);

   if(!passwordMatches){
    return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
   }

   const token = jwt.sign(
  {
    userId: user._id
  },
  process.env.JWT_SECRET,
  {
    expiresIn: process.env.JWT_EXPIRES_IN
  }
);

   return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    next(error);
  }
}


const getProfile = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user
  });
};

export { 
  registerUser, 
  loginUser,
  getProfile 
};


