import express from "express";
import { add, getAll, get, remove, update } from "../controllers/ordersController";
import { protect } from "../middleware/auth";
const router = express.Router();

router.get("/", protect, getAll);
router.get("/:id", protect, get);
router.post("/", protect, add);
router.put("/:id", protect, update);
router.delete("/:id", protect, remove);

export default router; 