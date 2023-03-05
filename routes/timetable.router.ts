import express from "express";
const router = express.Router();

import {getTimetable} from "../controllers/timetable.controller";
import auth from "../middlewares/auth";

router.use(auth("student"));

router.get("/", getTimetable);

export default router;
