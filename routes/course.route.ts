import express from "express";
const router = express.Router();

import {getCourseById, getCourses} from "../controllers/course.controller";
import auth from "../middlewares/auth";

router.use(auth());

router.get("/:id", getCourseById);
router.get("/", getCourses);

export default router;
