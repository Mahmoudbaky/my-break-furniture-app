import express from "express";
import { protect, authorize } from "../middleware/auth.js";

import * as headerFooterControllers from "../controllers/headerFooterContentControllers.js";

export const router = express.Router();

// Public routes
router.route("/all").get(headerFooterControllers.getHeaderFooterContent);
router.route("/:id").get(headerFooterControllers.getHeaderFooterContentById);

// Protected routes (admin only)
router
  .route("/create")
  .post(
    protect,
    authorize("admin"),
    headerFooterControllers.createHeaderFooterContent
  );

router
  .route("/:id")
  .put(
    protect,
    authorize("admin"),
    headerFooterControllers.updateHeaderFooterContent
  )
  .delete(
    protect,
    authorize("admin"),
    headerFooterControllers.deleteHeaderFooterContent
  );

export default router;
