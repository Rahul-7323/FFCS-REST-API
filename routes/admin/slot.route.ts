import express from "express";
const router = express.Router();

import {createSlot} from "../../controllers/admin/slot.controller";
import auth from "../../middlewares/auth";

router.use(auth("admin"));

router.post("/", createSlot);

export default router;
