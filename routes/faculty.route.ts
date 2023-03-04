import express from "express";
const router = express.Router();

import {getFacultyById, getFaculties} from "../controllers/faculty.controller";

router.get("/:id", getFacultyById);
router.get("/", getFaculties);

export default router;
