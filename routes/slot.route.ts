import express from "express";
const router = express.Router();

import {getSlotById, getSlots} from "../controllers/slot.controller";

router.get("/:id", getSlotById);
router.get("/", getSlots);

export default router;
