import express from "express";
import { protect, authorize } from "../middleware/auth.js";

import * as messageControllers from "../controllers/messageControllers.js";

export const router = express.Router();

// Submit a new message
router.post("/submit", messageControllers.submitMessage);

// Get all messages for admin (protected route)
router.get(
  "/all-messages",
  protect,
  authorize("admin"),
  messageControllers.getAllMessages
);

// Mark a message as read (admin only)
router.put(
  "/mark-as-read/:id",
  protect,
  authorize("admin"),
  messageControllers.markMessageAsRead
);

// Delete a message (admin only)
router.delete(
  "/delete/:id",
  protect,
  authorize("admin"),
  messageControllers.deleteMessage
);

export default router;
