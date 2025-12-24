import express from "express";
import { protect, authorize } from "../middleware/auth.js";

import * as heroContentControllers from "../controllers/heroContentControllers.js";

export const router = express.Router();

/**
 * @swagger
 * /api/hero-content/new-hero-content:
 *   post:
 *     summary: Create new hero content (admin only)
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
 *               title:
 *                 type: string
 *                 example: Welcome to Our Store
 *               subTitle:
 *                 type: string
 *                 example: Discover amazing furniture
 *               image:
 *                 type: string
 *                 format: uri
 *                 example: https://example.com/hero-image.jpg
 *               buttonText:
 *                 type: string
 *                 example: Shop Now
 *               link:
 *                 type: string
 *                 example: /products
 *     responses:
 *       201:
 *         description: Hero content created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin role required)
 *       500:
 *         description: Error creating hero content
 */
router.post(
  "/new-hero-content",
  protect,
  authorize("admin"),
  heroContentControllers.createHeroContent
);

/**
 * @swagger
 * /api/hero-content/all-hero-content:
 *   get:
 *     summary: Get all hero content (public)
 *     tags: [Content]
 *     responses:
 *       200:
 *         description: Hero content retrieved successfully
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
 *         description: Error fetching hero content
 */
router.get("/all-hero-content", heroContentControllers.getHeroContent);

/**
 * @swagger
 * /api/hero-content/update-hero-content/{id}:
 *   put:
 *     summary: Update hero content (admin only)
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Hero content ID
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
 *               buttonText:
 *                 type: string
 *               link:
 *                 type: string
 *     responses:
 *       200:
 *         description: Hero content updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin role required)
 *       500:
 *         description: Error updating hero content
 */
router.put(
  "/update-hero-content/:id",
  protect,
  authorize("admin"),
  heroContentControllers.updateHeroContent
);

/**
 * @swagger
 * /api/hero-content/delete-hero-content/{id}:
 *   delete:
 *     summary: Delete hero content (admin only)
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Hero content ID
 *     responses:
 *       200:
 *         description: Hero content deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin role required)
 *       500:
 *         description: Error deleting hero content
 */
router.delete(
  "/delete-hero-content/:id",
  protect,
  authorize("admin"),
  heroContentControllers.deleteHeroContent
);

export default router;
