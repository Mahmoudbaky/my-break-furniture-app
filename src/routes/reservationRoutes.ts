import express from "express";
import { protect, authorize } from "../middleware/auth.js";

import * as reservationControllers from "../controllers/reservationControllers.js";

export const router = express.Router();

/**
 * @swagger
 * /api/reservations/new-reservation:
 *   post:
 *     summary: Create a new reservation from cart
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - shippingAddress
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               phone:
 *                 type: string
 *                 example: +1234567890
 *               notes:
 *                 type: string
 *                 example: Please deliver in the morning
 *               shippingAddress:
 *                 type: string
 *                 example: 123 Main St, City, Country
 *     responses:
 *       201:
 *         description: Reservation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad request (cart is empty or product unavailable)
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error creating reservation
 */
router.post(
  "/new-reservation",
  protect,
  authorize("user", "admin"),
  reservationControllers.createReservation
);

/**
 * @swagger
 * /api/reservations/all-reservations:
 *   get:
 *     summary: Get all reservations (admin only)
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reservations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       user:
 *                         type: object
 *                       items:
 *                         type: array
 *                       totalAmount:
 *                         type: number
 *                       status:
 *                         type: string
 *                         enum: [waiting, confirmed, cancelled, completed]
 *                       itemsCount:
 *                         type: number
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin role required)
 *       500:
 *         description: Error fetching reservations
 */
router.get(
  "/all-reservations",
  protect,
  authorize("admin"),
  reservationControllers.getAllReservations
);

/**
 * @swagger
 * /api/reservations/update-reservation-status/{reservationId}:
 *   put:
 *     summary: Update reservation status
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reservationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [waiting, confirmed, cancelled, completed]
 *                 example: confirmed
 *     responses:
 *       200:
 *         description: Reservation status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin role required)
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Error updating reservation status
 */
router.put(
  "/update-reservation-status/:reservationId",
  protect,
  authorize("admin"),
  reservationControllers.updateReservationStatus
);

export default router;
