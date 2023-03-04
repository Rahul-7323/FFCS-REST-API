import express from "express";
const router = express.Router();

import {createCourse} from "../../controllers/admin/course.controller";

router.post("/", createCourse);

export default router;
