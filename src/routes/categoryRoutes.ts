import express from "express";
import { protect, authorize } from "../middleware/auth.js";

import * as categoryControllers from "../controllers/categoryControllers.js";

export const router = express.Router();

/**
 * @swagger
 * /api/categories/new-category:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Chairs
 *               description:
 *                 type: string
 *                 example: Various types of chairs
 *     responses:
 *       201:
 *         description: Category created successfully
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
 *                   example: Category created successfully
 *       400:
 *         description: Bad request (invalid data or category already exists)
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin role required)
 *       409:
 *         description: Category with this name already exists
 *       500:
 *         description: Internal server error
 */
router.post(
  "/new-category",
  protect,
  authorize("admin"),
  categoryControllers.createCategory
);

/**
 * @swagger
 * /api/categories/all-categories:
 *   get:
 *     summary: Get all categories (public)
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
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
 *         description: Internal server error
 */
router.get("/all-categories", categoryControllers.getAllCategories);

/**
 * @swagger
 * /api/categories/all-categories-admin:
 *   get:
 *     summary: Get all categories with product counts (admin/manager only)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories with product counts retrieved successfully
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
 *                       description:
 *                         type: string
 *                       productCount:
 *                         type: number
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin or manager role required)
 *       500:
 *         description: Internal server error
 */
router.get(
  "/all-categories-admin",
  protect,
  authorize("admin", "manager"),
  categoryControllers.getAllCategoriesForAdmin
);

/**
 * @swagger
 * /api/categories/update-category/{categoryId}:
 *   put:
 *     summary: Update a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request (invalid data)
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin role required)
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/update-category/:categoryId",
  protect,
  authorize("admin"),
  categoryControllers.updateCategory
);

/**
 * @swagger
 * /api/categories/delete-category/{categoryId}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Cannot delete category with existing products
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin role required)
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/delete-category/:categoryId",
  protect,
  authorize("admin"),
  categoryControllers.deleteCategory
);

export default router;
