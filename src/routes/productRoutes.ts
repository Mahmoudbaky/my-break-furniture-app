import express from "express";
import { protect, authorize } from "../middleware/auth.js";

import * as productControllers from "../controllers/productControllers.js";

export const router = express.Router();

// Create a new product (only for ADMIN and MANAGER roles)
router.post(
  "/new-product",
  protect,
  authorize("admin"),
  productControllers.createProduct
);

// Get all products with pagination
router.get(
  "/all-products",
  protect,
  authorize("admin"),
  productControllers.getAllProducts
);

// Filter products by category
router.get("/filter-products", productControllers.filterProducts);

// Get a single product by ID
router.get("/get-product/:id", productControllers.getProductById);

// Update a product by ID (only for ADMIN and MANAGER roles)
router.put(
  "/update-product/:id",
  protect,
  authorize("admin"),
  productControllers.updateProduct
);

// Delete a product by ID (only for ADMIN and MANAGER roles)
router.delete(
  "/delete-product/:id",
  protect,
  authorize("admin"),
  productControllers.deleteProduct
);

export default router;
