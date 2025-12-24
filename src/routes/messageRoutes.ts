import express from "express";
import { protect, authorize } from "../middleware/auth.js";

import * as messageControllers from "../controllers/messageControllers.js";

export const router = express.Router();

/**
 * @swagger
 * /api/messages/submit:
 *   post:
 *     summary: Submit a new message (public)
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               phone:
 *                 type: string
 *                 example: +1234567890
 *               message:
 *                 type: string
 *                 example: I would like to know more about your products
 *     responses:
 *       201:
 *         description: Message submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Message submitted successfully
 *       400:
 *         description: Bad request (invalid data)
 *       500:
 *         description: Error submitting message
 */
router.post("/submit", messageControllers.submitMessage);

/**
 * @swagger
 * /api/messages/all-messages:
 *   get:
 *     summary: Get all messages (admin only)
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Messages retrieved successfully
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
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       message:
 *                         type: string
 *                       read:
 *                         type: boolean
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin role required)
 *       500:
 *         description: Error fetching messages
 */
router.get(
  "/all-messages",
  protect,
  authorize("admin"),
  messageControllers.getAllMessages
);

/**
 * @swagger
 * /api/messages/mark-as-read/{id}:
 *   put:
 *     summary: Mark a message as read (admin only)
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Message ID
 *     responses:
 *       200:
 *         description: Message marked as read successfully
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
 *         description: Message not found
 *       500:
 *         description: Error marking message as read
 */
router.put(
  "/mark-as-read/:id",
  protect,
  authorize("admin"),
  messageControllers.markMessageAsRead
);

/**
 * @swagger
 * /api/messages/delete/{id}:
 *   delete:
 *     summary: Delete a message (admin only)
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Message ID
 *     responses:
 *       200:
 *         description: Message deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin role required)
 *       404:
 *         description: Message not found
 *       500:
 *         description: Error deleting message
 */
router.delete(
  "/delete/:id",
  protect,
  authorize("admin"),
  messageControllers.deleteMessage
);

export default router;
