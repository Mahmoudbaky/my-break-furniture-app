import express from "express";
import { protect, authorize } from "../middleware/auth.js";

import * as reservationContactSettingsControllers from "../controllers/reservationContactSettingsControllers.js";

export const router = express.Router();

// Public routes
router
  .route("/all")
  .get(reservationContactSettingsControllers.getReservationContactSettings);
router
  .route("/:id")
  .get(reservationContactSettingsControllers.getReservationContactSettingsById);

// Protected routes (admin only)
router
  .route("/create")
  .post(
    protect,
    authorize("admin"),
    reservationContactSettingsControllers.createReservationContactSettings
  );

router
  .route("/:id")
  .put(
    protect,
    authorize("admin"),
    reservationContactSettingsControllers.updateReservationContactSettings
  )
  .delete(
    protect,
    authorize("admin"),
    reservationContactSettingsControllers.deleteReservationContactSettings
  );

export default router;
