import express from "express";
import { protect, authorize } from "../middleware/auth.js";

import * as contactusControllers from "../controllers/contactusContentControllers.js";

export const router = express.Router();

// Public routes
router.route("/all").get(contactusControllers.getContactUsContent);
router
  .route("/section/:sectionType")
  .get(contactusControllers.getContactUsContentBySectionType);
router.route("/:id").get(contactusControllers.getContactUsContentById);

// Protected routes (admin only)
router
  .route("/create")
  .post(
    protect,
    authorize("admin"),
    contactusControllers.createContactUsContent
  );

router
  .route("/:id")
  .put(protect, authorize("admin"), contactusControllers.updateContactUsContent)
  .delete(
    protect,
    authorize("admin"),
    contactusControllers.deleteContactUsContent
  );

export default router;
