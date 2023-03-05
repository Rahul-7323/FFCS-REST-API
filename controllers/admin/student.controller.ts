import dotenv from "dotenv";
dotenv.config();

import {validationResult} from "express-validator";
import bcrypt from "bcryptjs";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const createStudent = async (req: any, res: any, next: any) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Invalid data provided");
    res.status(400);
    return next(error);
  }

  const {id, name, password}: {id: string; name: string; password: string} =
    req.body;

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_PASSWORD_SALT!, 10)
    );
  } catch (err) {
    const error = new Error("Something went wrong in the server");
    console.log(err);
    res.status(500);
    return next(error);
  }

  let student;

  try {
    student = await prisma.student.create({
      data: {
        id: id,
        name: name,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
      },
    });
  } catch (err) {
    const error = new Error("Something went wrong in the server");
    res.status(500);
    return next(error);
  }

  res.json({success: true, data: student});
};

export {createStudent};
