import { body } from "express-validator";

// Signup input rules
export const signupValidation = [
  body("fullName")
    .notEmpty()
    .withMessage("Full name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

// Login input rules
export const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];
