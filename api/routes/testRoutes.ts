import express from "express";
const router = express.Router();

router.get("/", (req, res) => res.json({ msg: "Get Test Objects" }));
router.get("/:id", (req, res) => res.json({ msg: `Get Test Object ${req.params.id}` }));
router.post("/", (req, res) => res.json({ msg: "Set Test Object" }));
router.put("/:id", (req, res) => res.json({ msg: `Update Test Object ${req.params.id}` }));
router.delete("/:id", (req, res) => res.json({ msg: `Delete Test Object ${req.params.id}` }));

export default router; 