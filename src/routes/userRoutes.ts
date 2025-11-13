import express from "express";

import * as userControllers from "../controllers/userControllers.js";
import { protect, authorize } from "../middleware/auth.js";

export const router = express.Router();

// Get all users (for Admin)
router.get(
  "/all-users",
  protect,
  authorize("admin"),
  userControllers.getAllUsers
);

export default router;
