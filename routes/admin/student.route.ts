import express from "express";
const router = express.Router();

import {createStudent} from "../../controllers/admin/student.controller";
import auth from "../../middlewares/auth";

router.use(auth("admin"));

router.post("/", createStudent);

export default router;
