import express from "express";
import { protect } from "../middleware/auth";
import { config } from "../controllers/stripeController";
const router = express.Router();

router.get("/config", protect, config);

export default router; 