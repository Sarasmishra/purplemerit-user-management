import express from "express";
import { getAllUsers } from "../controllers/userController.js";
import {
  authenticate,
  authorizeAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin-only: list users with pagination
router.get("/", authenticate, authorizeAdmin, getAllUsers);

export default router;
