import express from "express";
import { protect, authorize } from "../middleware/auth.js";

import * as headerFooterControllers from "../controllers/headerFooterContentControllers.js";

export const router = express.Router();

/**
 * @swagger
 * /api/headerfooter-content/all:
 *   get:
 *     summary: Get all Header/Footer content (public)
 *     tags: [Content]
 *     responses:
 *       200:
 *         description: Header Footer content retrieved successfully
 *       500:
 *         description: Error fetching Header Footer content
 */
router.route("/all").get(headerFooterControllers.getHeaderFooterContent);

/**
 * @swagger
 * /api/headerfooter-content/{id}:
 *   get:
 *     summary: Get Header/Footer content by ID (public)
 *     tags: [Content]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Header Footer content ID
 *     responses:
 *       200:
 *         description: Header Footer content retrieved successfully
 *       404:
 *         description: Header Footer content not found
 *       500:
 *         description: Error fetching Header Footer content
 *   put:
 *     summary: Update Header/Footer content (admin only)
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Header Footer content ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               logoText:
 *                 type: string
 *               displaylogoImage:
 *                 type: boolean
 *               displayLogoText:
 *                 type: boolean
 *               logoImage:
 *                 type: string
 *                 format: uri
 *     responses:
 *       200:
 *         description: Header Footer content updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin role required)
 *       404:
 *         description: Header Footer content not found
 *       500:
 *         description: Error updating Header Footer content
 *   delete:
 *     summary: Delete Header/Footer content (admin only)
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Header Footer content ID
 *     responses:
 *       200:
 *         description: Header Footer content deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin role required)
 *       404:
 *         description: Header Footer content not found
 *       500:
 *         description: Error deleting Header Footer content
 */
router.route("/:id").get(headerFooterControllers.getHeaderFooterContentById);

/**
 * @swagger
 * /api/headerfooter-content/create:
 *   post:
 *     summary: Create Header/Footer content (admin only)
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
 *               logoText:
 *                 type: string
 *                 example: My Store
 *               displaylogoImage:
 *                 type: boolean
 *                 example: true
 *               displayLogoText:
 *                 type: boolean
 *                 example: false
 *               logoImage:
 *                 type: string
 *                 format: uri
 *                 example: https://example.com/logo.png
 *     responses:
 *       201:
 *         description: Header Footer content created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin role required)
 *       500:
 *         description: Error creating Header Footer content
 */
router
  .route("/create")
  .post(
    protect,
    authorize("admin"),
    headerFooterControllers.createHeaderFooterContent
  );

router
  .route("/:id")
  .put(
    protect,
    authorize("admin"),
    headerFooterControllers.updateHeaderFooterContent
  )
  .delete(
    protect,
    authorize("admin"),
    headerFooterControllers.deleteHeaderFooterContent
  );

export default router;
