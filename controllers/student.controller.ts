import dotenv from "dotenv";
dotenv.config();

import {validationResult} from "express-validator";
import bcrypt from "bcryptjs";
import {PrismaClient} from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const getStudentById = async (req: any, res: any, next: any) => {
  const studentId = req.params.id;
  let student;

  try {
    student = await prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });
  } catch (err) {
    const error = new Error("Something went wrong in the server");
    res.status(500);
    return next(error);
  }

  if (!student) {
    const error = new Error("Could not find any student with the given id");
    res.status(404);
    return next(error);
  }

  res.json({success: true, data: student});
};

const getStudents = async (req: any, res: any, next: any) => {
  let students;

  try {
    students = await prisma.student.findMany();
  } catch (err) {
    const error = new Error("Something went wrong in the server");
    res.status(500);
    return next(error);
  }

  if (!students || students.length === 0) {
    const error = new Error("Could not find any students");
    res.status(404);
    return next(error);
  }

  res.json({success: true, data: students});
};

const login = async (req: any, res: any, next: any) => {
  // the student logs in with registration number and password
  // the registration number is the id of the student
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Invalid data provided");
    res.status(400);
    return next(error);
  }

  const {id, password}: {id: string; password: string} = req.body;

  let student;

  try {
    student = await prisma.student.findUnique({
      where: {
        id: id,
      },
    });
  } catch (err) {
    const error = new Error("Something went wrong in the server");
    res.status(500);
    return next(error);
  }

  if (!student) {
    const error = new Error("Invalid id or password provided");
    res.status(400);
    return next(error);
  }

  let isValidPassword = false;

  try {
    isValidPassword = await bcrypt.compare(password, student.password);
  } catch (err) {
    const error = new Error("Invalid id or password provided");

    res.status(400);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new Error("Invalid id or password provided");
    res.status(400);
    return next(error);
  }

  let token;

  try {
    token = jwt.sign(
      {id: student.id, role: "student"},
      process.env.JWT_SECRET!
    );
  } catch (err) {
    const error = new Error("Something went wrong in the server");
    res.status(500);
    return next(error);
  }

  return res.json({success: true, data: {token}});
};

export {getStudentById, getStudents, login};
