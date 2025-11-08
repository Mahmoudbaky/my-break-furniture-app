import express from "express";
// import { protect, authorize } from "../middleware/auth.js";

import * as reservationControllers from "../controllers/reservationControllers.js";

export const router = express.Router();

// Create a new reservation
router.post(
  "/new-reservation",
  //   protect,
  //   authorize("user"),
  reservationControllers.createReservation
);

export default router;
