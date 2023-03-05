import express from "express";
const router = express.Router();

import {createCourse} from "../../controllers/admin/course.controller";
import auth from "../../middlewares/auth";

router.use(auth("admin"));

router.post("/", createCourse);

export default router;
