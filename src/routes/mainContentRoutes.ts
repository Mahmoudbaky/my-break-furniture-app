import express from "express";
import { protect, authorize } from "../middleware/auth.js";

import * as mainContentControllers from "../controllers/mainContentControllers.js";

export const router = express.Router();

/**
 * @swagger
 * /api/main-content/all-main-content:
 *   get:
 *     summary: Get all main content (public)
 *     tags: [Content]
 *     responses:
 *       200:
 *         description: Main content retrieved successfully
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
 *       500:
 *         description: Error fetching main content
 */
router.get("/all-main-content", mainContentControllers.getMainContent);

/**
 * @swagger
 * /api/main-content/create-main-content:
 *   post:
 *     summary: Create main content (admin only)
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
 *               name:
 *                 type: string
 *                 example: Featured Collection
 *               title:
 *                 type: string
 *                 example: Our Best Sellers
 *               subTitle:
 *                 type: string
 *                 example: Discover our most popular items
 *               image:
 *                 type: string
 *                 format: uri
 *               description:
 *                 type: string
 *               buttonText:
 *                 type: string
 *               link:
 *                 type: string
 *     responses:
 *       201:
 *         description: Main content created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin role required)
 *       500:
 *         description: Error creating main content
 */
router.post(
  "/create-main-content",
  protect,
  authorize("admin"),
  mainContentControllers.createMainContent
);

/**
 * @swagger
 * /api/main-content/update-main-content/{id}:
 *   put:
 *     summary: Update main content (admin only)
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Main content ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               subtitle:
 *                 type: string
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *               buttonText:
 *                 type: string
 *               link:
 *                 type: string
 *     responses:
 *       200:
 *         description: Main content updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin role required)
 *       500:
 *         description: Error updating main content
 */
router.put(
  "/update-main-content/:id",
  protect,
  authorize("admin"),
  mainContentControllers.updateMainContent
);

export default router;
