import express from "express";
const router = express.Router();

import {createFaculty} from "../../controllers/admin/faculty.controller";
import auth from "../../middlewares/auth";

router.use(auth("admin"));

router.post("/", createFaculty);

export default router;
