import express from "express";
import { signup, login } from "../controllers/authController.js";
import {
  signupValidation,
  loginValidation,
} from "../validators/authValidator.js";

const router = express.Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

export default router;
