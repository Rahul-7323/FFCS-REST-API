import express from "express";
const router = express.Router();

import {createStudent} from "../../controllers/admin/student.controller";

router.post("/", createStudent);

export default router;
