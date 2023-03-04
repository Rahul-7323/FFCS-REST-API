import express from "express";
const router = express.Router();

import {getStudentById, getStudents} from "../controllers/student.controller";

router.get("/:id", getStudentById);
router.get("/", getStudents);

export default router;
