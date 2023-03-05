import express from "express";
const router = express.Router();

import {getSlotById, getSlots} from "../controllers/slot.controller";
import auth from "../middlewares/auth";

router.use(auth());

router.get("/:id", getSlotById);
router.get("/", getSlots);

export default router;
