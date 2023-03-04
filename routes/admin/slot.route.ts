import express from "express";
const router = express.Router();

import {createSlot} from "../../controllers/admin/slot.controller";

router.post("/", createSlot);

export default router;
