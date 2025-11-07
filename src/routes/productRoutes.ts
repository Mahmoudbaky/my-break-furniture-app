import express from "express";
// import { protect, authorize } from "../middleware/auth.js";

import * as productControllers from "../controllers/productControllers.js";

export const router = express.Router();

// Create a new product (only for ADMIN and MANAGER roles)
router.post(
  "/new-product",
  //   protect,
  //   authorize("admin"),
  productControllers.createProduct
);

export default router;
