import express from "express";
import { protect, authorize } from "../middleware/auth.js";

import * as userControllers from "../controllers/userControllers.js";

export const router = express.Router();

/**
 * @swagger
 * /api/users/all-users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
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
 *                       email:
 *                         type: string
 *                       username:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       role:
 *                         type: string
 *                         enum: [user, admin, manager]
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin role required)
 *       500:
 *         description: Internal server error
 */
router.get(
  "/all-users",
  protect,
  authorize("admin"),
  userControllers.getAllUsers
);

export default router;
