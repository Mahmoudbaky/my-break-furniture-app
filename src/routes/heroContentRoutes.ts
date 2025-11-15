import express from "express";
import { protect, authorize } from "../middleware/auth.js";

import * as heroContentControllers from "../controllers/heroContentControllers.js";

export const router = express.Router();

// Create new hero content (only for ADMIN role)
router.post(
  "/new-hero-content",
  protect,
  authorize("admin"),
  heroContentControllers.createHeroContent
);

// Get all hero content
router.get("/all-hero-content", heroContentControllers.getHeroContent);

// Update hero content (only for ADMIN role)
router.put(
  "/update-hero-content/:id",
  protect,
  authorize("admin"),
  heroContentControllers.updateHeroContent
);

router.delete(
  "/delete-hero-content/:id",
  protect,
  authorize("admin"),
  heroContentControllers.deleteHeroContent
);

export default router;
