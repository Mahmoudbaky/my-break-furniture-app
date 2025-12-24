import express from "express";
import { protect, authorize } from "../middleware/auth.js";

import * as aboutusControllers from "../controllers/aboutusContentControllers.js";

export const router = express.Router();

/**
 * @swagger
 * /api/aboutus-content/all:
 *   get:
 *     summary: Get all About Us content (public)
 *     tags: [Content]
 *     responses:
 *       200:
 *         description: About Us content retrieved successfully
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
 *         description: Error fetching About Us content
 */
router.route("/all").get(aboutusControllers.getAboutUsContent);

/**
 * @swagger
 * /api/aboutus-content/create:
 *   post:
 *     summary: Create About Us content (admin only)
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
 *               sectionType:
 *                 type: string
 *               buttonText:
 *                 type: string
 *               buttonSubText:
 *                 type: string
 *               title:
 *                 type: string
 *               subTitle:
 *                 type: string
 *               image:
 *                 type: string
 *               link:
 *                 type: string
 *               description:
 *                 type: string
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *               morals:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: About Us content created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin role required)
 *       500:
 *         description: Error creating About Us content
 */
router
  .route("/create")
  .post(protect, authorize("admin"), aboutusControllers.createAboutUsContent);

/**
 * @swagger
 * /api/aboutus-content/{id}:
 *   put:
 *     summary: Update About Us content (admin only)
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: About Us content ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sectionType:
 *                 type: string
 *               buttonText:
 *                 type: string
 *               buttonSubText:
 *                 type: string
 *               title:
 *                 type: string
 *               subTitle:
 *                 type: string
 *               image:
 *                 type: string
 *               link:
 *                 type: string
 *               description:
 *                 type: string
 *               features:
 *                 type: array
 *               morals:
 *                 type: array
 *     responses:
 *       200:
 *         description: About Us content updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin role required)
 *       500:
 *         description: Error updating About Us content
 */
router
  .route("/:id")
  .put(protect, authorize("admin"), aboutusControllers.updateAboutUsContent);

export default router;
