import {validationResult} from "express-validator";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const createStudent = async (req: any, res: any, next: any) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Invalid data provided");
    res.status(400);
    return next(error);
  }

  const {id, name}: {id: string; name: string} = req.body;

  let student;

  try {
    student = await prisma.student.create({
      data: {
        id,
        name,
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
