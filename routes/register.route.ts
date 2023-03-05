import express from "express";
const router = express.Router();

import {register} from "../controllers/register.controller";
import auth from "../middlewares/auth";

router.use(auth("student"));

router.post("/", register);

export default router;
