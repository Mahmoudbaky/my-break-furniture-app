import express from "express";
import { protect, authorize } from "../middleware/auth.js";

import * as reservationControllers from "../controllers/reservationControllers.js";

export const router = express.Router();

// Create a new reservation
router.post(
  "/new-reservation",
  protect,
  authorize("user", "admin"),
  reservationControllers.createReservation
);

// get all reservations (admin only)
router.get(
  "/all-reservations",
  protect,
  authorize("admin"),
  reservationControllers.getAllReservations
);

// update reservation status
router.put(
  "/update-reservation-status/:reservationId",
  protect,
  authorize("admin"),
  reservationControllers.updateReservationStatus
);

export default router;
