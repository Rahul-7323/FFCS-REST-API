import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

import jwt from "jsonwebtoken";

// generate the token for the admin user
const createDummyAdmin = async () => {
  const adminToken = jwt.sign(
    {id: "admin007", role: "admin"},
    process.env.JWT_SECRET!
  );

  console.log("Admin Token: " + adminToken);
};

// create a dummy student
const createDummyStudent = async () => {
  const id = "20BRS1121";
  const name = "Rahul M";
  const password = "password";

  let hashedPassword;

  hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.BCRYPT_PASSWORD_SALT!, 10)
  );

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
  } catch (err) {}

  const studentToken = jwt.sign(
    {id: id, role: "student"},
    process.env.JWT_SECRET!
  );

  console.log("Student Token: " + studentToken);
};

export {createDummyAdmin, createDummyStudent};
