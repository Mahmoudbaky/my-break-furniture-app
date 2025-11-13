import express from "express";
import { protect, authorize } from "../middleware/auth.js";

import * as messageControllers from "../controllers/messageControllers.js";

export const router = express.Router();

// Submit a new message
router.post("/submit", messageControllers.submitMessage);

// Get all messages for admin only
router.get(
  "/all-messages",
  protect,
  authorize("admin"),
  messageControllers.getAllMessages
);

export default router;
