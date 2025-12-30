import express from "express";
import { getAllUsers,  activateUser,
  deactivateUser, } from "../controllers/userController.js";
import {
  authenticate,
  authorizeAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin-only: list users with pagination
router.get("/", authenticate, authorizeAdmin, getAllUsers);
router.patch("/:id/activate", authenticate, authorizeAdmin, activateUser);
router.patch("/:id/deactivate", authenticate, authorizeAdmin, deactivateUser);


export default router;
