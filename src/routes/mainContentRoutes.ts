import express from "express";
import { protect, authorize } from "../middleware/auth.js";

import * as mainContentControllers from "../controllers/mainContentControllers.js";

export const router = express.Router();

// Get main content
router.get("/all-main-content", mainContentControllers.getMainContent);

// Update main content (only for ADMIN role)
router.put(
  "/update-main-content/:id",
  protect,
  authorize("admin"),
  mainContentControllers.updateMainContent
);

export default router;
