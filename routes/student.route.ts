import express from "express";
const router = express.Router();

import {
  getStudentById,
  getStudents,
  login,
} from "../controllers/student.controller";
import auth from "../middlewares/auth";

router.post("/login", login);

router.use(auth());

router.get("/:id", getStudentById);

router.use(auth("admin"));

router.get("/", getStudents);

export default router;
