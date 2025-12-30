import { validationResult } from "express-validator";
import User from "../models/User.js";
import {
  hashPassword,
  comparePassword,
  generateToken,
} from "../utils/auth.js";

// Handles user signup
export const signup = async (req, res) => {
  const errors = validationResult(req);

  // Validation guard
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { fullName, email, password } = req.body;

  try {
    // Prevent duplicate accounts
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Secure password storage
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = generateToken({
      id: user._id,
      role: user.role,
    });

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Signup failed",
    });
  }
};

// Handles user login
export const login = async (req, res) => {
  const errors = validationResult(req);

  // Validation guard
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  try {
    // Explicitly select password for comparison
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Block inactive users
    if (user.status === "inactive") {
      return res.status(403).json({
        success: false,
        message: "Account is inactive",
      });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Track login activity
    user.lastLogin = new Date();
    await user.save();

    const token = generateToken({
      id: user._id,
      role: user.role,
    });

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};
