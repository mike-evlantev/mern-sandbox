import express from "express";
import { protect } from "../middleware/auth";
import { config, createPaymentIntent } from "../controllers/stripeController";
const router = express.Router();

router.get("/config", protect, config);
router.post("/createPaymentIntent", protect, createPaymentIntent);

export default router; 