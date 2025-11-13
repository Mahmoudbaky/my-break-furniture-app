import express from "express";
// import { protect, authorize } from "../middleware/auth.js";

import * as authControllers from "../controllers/authControllers.js";

export const router = express.Router();

// Register a new user
router.post("/register", authControllers.registerUser);

// Login user
router.post("/login", authControllers.login);

export default router;
