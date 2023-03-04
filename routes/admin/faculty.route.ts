import express from "express";
const router = express.Router();

import {createFaculty} from "../../controllers/admin/faculty.controller";

router.post("/", createFaculty);

export default router;
