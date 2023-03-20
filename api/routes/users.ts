import express from "express";
import { add, getAll, get, remove, update, current, login } from "../controllers/usersController";
import { protect } from "../middleware/auth";
const router = express.Router();

router.get("/", protect, getAll);
router.get("/current", protect, current);
router.get("/:id", protect, get);
router.post("/", protect, add);
router.post("/login", login);
router.put("/:id", protect, update);
router.delete("/:id", protect, remove);

export default router; 