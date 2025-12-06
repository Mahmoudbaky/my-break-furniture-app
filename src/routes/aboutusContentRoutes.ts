import express from "express";
import { protect, authorize } from "../middleware/auth.js";

import * as aboutusControllers from "../controllers/aboutusContentControllers.js";

export const router = express.Router();

router.route("/all").get(aboutusControllers.getAboutUsContent);

// for development purposes
router
  .route("/create")
  .post(protect, authorize("admin"), aboutusControllers.createAboutUsContent);

router
  .route("/:id")
  .put(protect, authorize("admin"), aboutusControllers.updateAboutUsContent);

export default router;
