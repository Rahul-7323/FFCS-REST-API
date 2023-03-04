import express from "express";
const router = express.Router();

import {getCourseById, getCourses} from "../controllers/course.controller";

router.get("/:id", getCourseById);
router.get("/", getCourses);

export default router;
