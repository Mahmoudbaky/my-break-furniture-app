import express from "express";
import { protect, authorize } from "../middleware/auth.js";

import * as contactusControllers from "../controllers/contactusContentControllers.js";

export const router = express.Router();

/**
 * @swagger
 * /api/contactus-content/all:
 *   get:
 *     summary: Get all Contact Us content (public)
 *     tags: [Content]
 *     responses:
 *       200:
 *         description: Contact Us content retrieved successfully
 *       500:
 *         description: Error fetching Contact Us content
 */
router.route("/all").get(contactusControllers.getContactUsContent);

/**
 * @swagger
 * /api/contactus-content/section/{sectionType}:
 *   get:
 *     summary: Get Contact Us content by section type (public)
 *     tags: [Content]
 *     parameters:
 *       - in: path
 *         name: sectionType
 *         required: true
 *         schema:
 *           type: string
 *         description: Section type
 *     responses:
 *       200:
 *         description: Contact Us content retrieved successfully
 *       404:
 *         description: Content not found for this section type
 *       500:
 *         description: Error fetching Contact Us content
 */
router
  .route("/section/:sectionType")
  .get(contactusControllers.getContactUsContentBySectionType);

/**
 * @swagger
 * /api/contactus-content/{id}:
 *   get:
 *     summary: Get Contact Us content by ID (public)
 *     tags: [Content]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact Us content ID
 *     responses:
 *       200:
 *         description: Contact Us content retrieved successfully
 *       404:
 *         description: Contact Us content not found
 *       500:
 *         description: Error fetching Contact Us content
 *   put:
 *     summary: Update Contact Us content (admin only)
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact Us content ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sectionType:
 *                 type: string
 *               title:
 *                 type: string
 *               subTitle:
 *                 type: string
 *               description:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               workHours:
 *                 type: string
 *               mapLink:
 *                 type: string
 *               contactFormTitle:
 *                 type: string
 *               contactFormDescription:
 *                 type: string
 *               facebookLink:
 *                 type: string
 *               instagramLink:
 *                 type: string
 *               whatsappLink:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact Us content updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin role required)
 *       404:
 *         description: Contact Us content not found
 *       500:
 *         description: Error updating Contact Us content
 *   delete:
 *     summary: Delete Contact Us content (admin only)
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact Us content ID
 *     responses:
 *       200:
 *         description: Contact Us content deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin role required)
 *       404:
 *         description: Contact Us content not found
 *       500:
 *         description: Error deleting Contact Us content
 */
router.route("/:id").get(contactusControllers.getContactUsContentById);

/**
 * @swagger
 * /api/contactus-content/create:
 *   post:
 *     summary: Create Contact Us content (admin only)
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
 *               title:
 *                 type: string
 *               subTitle:
 *                 type: string
 *               description:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               workHours:
 *                 type: string
 *               mapLink:
 *                 type: string
 *               contactFormTitle:
 *                 type: string
 *               contactFormDescription:
 *                 type: string
 *               facebookLink:
 *                 type: string
 *               instagramLink:
 *                 type: string
 *               whatsappLink:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact Us content created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin role required)
 *       500:
 *         description: Error creating Contact Us content
 */
router
  .route("/create")
  .post(
    protect,
    authorize("admin"),
    contactusControllers.createContactUsContent
  );

router
  .route("/:id")
  .put(protect, authorize("admin"), contactusControllers.updateContactUsContent)
  .delete(
    protect,
    authorize("admin"),
    contactusControllers.deleteContactUsContent
  );

export default router;
