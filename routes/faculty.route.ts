import express from "express";
const router = express.Router();

import {getFacultyById, getFaculties} from "../controllers/faculty.controller";
import auth from "../middlewares/auth";

router.use(auth());

router.get("/:id", getFacultyById);
router.get("/", getFaculties);

export default router;
