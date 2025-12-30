import express from "express";
import { signup, login ,getCurrentUser, logout } from "../controllers/authController.js";
import {
  signupValidation,
  loginValidation,
} from "../validators/authValidator.js";
import { authenticate } from "../middleware/authMiddleware.js";



const router = express.Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.get("/me", authenticate, getCurrentUser);
router.post("/logout", authenticate, logout);


export default router;
