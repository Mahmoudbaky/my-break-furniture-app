import express from "express";
import { protect, authorize } from "../middleware/auth.js";

import * as reservationContactSettingsControllers from "../controllers/reservationContactSettingsControllers.js";

export const router = express.Router();

/**
 * @swagger
 * /api/reservation-contact-settings/all:
 *   get:
 *     summary: Get all reservation contact settings (public)
 *     tags: [Content]
 *     responses:
 *       200:
 *         description: Reservation contact settings retrieved successfully
 *       500:
 *         description: Error fetching reservation contact settings
 */
router
  .route("/all")
  .get(reservationContactSettingsControllers.getReservationContactSettings);

/**
 * @swagger
 * /api/reservation-contact-settings/{id}:
 *   get:
 *     summary: Get reservation contact settings by ID (public)
 *     tags: [Content]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation contact settings ID
 *     responses:
 *       200:
 *         description: Reservation contact settings retrieved successfully
 *       404:
 *         description: Reservation contact settings not found
 *       500:
 *         description: Error fetching reservation contact settings
 *   put:
 *     summary: Update reservation contact settings (admin only)
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation contact settings ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               displayBookingButton:
 *                 type: boolean
 *               displayWhatsappButton:
 *                 type: boolean
 *               displayPhoneButton:
 *                 type: boolean
 *               displayAddToCartButton:
 *                 type: boolean
 *               address:
 *                 type: string
 *               whatsappNumber:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               sectionDescription:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reservation contact settings updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin role required)
 *       404:
 *         description: Reservation contact settings not found
 *       500:
 *         description: Error updating reservation contact settings
 *   delete:
 *     summary: Delete reservation contact settings (admin only)
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation contact settings ID
 *     responses:
 *       200:
 *         description: Reservation contact settings deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin role required)
 *       404:
 *         description: Reservation contact settings not found
 *       500:
 *         description: Error deleting reservation contact settings
 */
router
  .route("/:id")
  .get(reservationContactSettingsControllers.getReservationContactSettingsById);

/**
 * @swagger
 * /api/reservation-contact-settings/create:
 *   post:
 *     summary: Create reservation contact settings (admin only)
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               displayBookingButton:
 *                 type: boolean
 *                 example: true
 *               displayWhatsappButton:
 *                 type: boolean
 *                 example: true
 *               displayPhoneButton:
 *                 type: boolean
 *                 example: true
 *               displayAddToCartButton:
 *                 type: boolean
 *                 example: true
 *               address:
 *                 type: string
 *                 example: 123 Main St, City
 *               whatsappNumber:
 *                 type: string
 *                 example: +1234567890
 *               phoneNumber:
 *                 type: string
 *                 example: +1234567890
 *               sectionDescription:
 *                 type: string
 *                 example: Contact us for reservations
 *     responses:
 *       201:
 *         description: Reservation contact settings created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin role required)
 *       500:
 *         description: Error creating reservation contact settings
 */
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
