import express from "express";
// import { protect, authorize } from "../middleware/auth.js";

import * as categoryControllers from "../controllers/categoryControllers.js";

export const router = express.Router();

// Create a new category (only for ADMIN and MANAGER roles)
router.post(
  "/new-category",
  //   protect,
  //   authorize("admin"),
  categoryControllers.createCategory
);

router.get("/all-categories", categoryControllers.getAllCategories);

export default router;
