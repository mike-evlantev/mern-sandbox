import express from "express";
import { add, getAll, getById, remove, update } from "../controllers/testController";
const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", add);
router.put("/:id", update);
router.delete("/:id", remove);

export default router; 