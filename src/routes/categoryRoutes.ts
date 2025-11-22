import express from "express";
import { protect, authorize } from "../middleware/auth.js";

import * as categoryControllers from "../controllers/categoryControllers.js";

export const router = express.Router();

// Create a new category (only for ADMIN and MANAGER roles)
router.post(
  "/new-category",
  protect,
  authorize("admin"),
  categoryControllers.createCategory
);

// Get all categories (public)
router.get("/all-categories", categoryControllers.getAllCategories);

// Get all categories with product counts (only for ADMIN and MANAGER roles)
router.get(
  "/all-categories-admin",
  protect,
  authorize("admin", "manager"),
  categoryControllers.getAllCategoriesForAdmin
);

// Update category (only for ADMIN role)
router.put(
  "/update-category/:categoryId",
  protect,
  authorize("admin"),
  categoryControllers.updateCategory
);

export default router;
