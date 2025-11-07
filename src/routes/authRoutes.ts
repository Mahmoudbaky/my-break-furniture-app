import express from "express";
// import { protect, authorize } from "../middleware/auth.js";

import * as authControllers from "../controllers/authControllers.js";

export const router = express.Router();

router.post("/register", authControllers.registerUser);
router.post("/login", authControllers.login);
export default router;
