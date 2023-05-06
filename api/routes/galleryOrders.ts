import express from "express";
import { add, getAll, get, remove, update } from "../controllers/galleryController";
import { protect } from "../middleware/auth";
const router = express.Router();

router.get("/orders", protect, getAll);
router.get("/orders/:id", protect, get);
router.post("/orders", protect, add);
router.put("/orders/:id", protect, update);
router.delete("/orders/:id", protect, remove);

export default router; 