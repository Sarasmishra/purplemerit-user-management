import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../config/env.js";

// Hash password before storing
export const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

// Compare raw password with hashed password
export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

// Generate JWT for authenticated user
export const generateToken = (payload) => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
