import express from "express";
import { add, getAll, get, remove, update } from "../controllers/testController";
const router = express.Router();

router.get("/", getAll);
router.get("/:id", get);
router.post("/", add);
router.put("/:id", update);
router.delete("/:id", remove);

export default router; 