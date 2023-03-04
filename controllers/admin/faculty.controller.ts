import {validationResult} from "express-validator";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const createFaculty = async (req: any, res: any, next: any) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Invalid data provided");
    res.status(400);
    return next(error);
  }

  const {id, name}: {id: string; name: string} = req.body;

  let faculty;

  try {
    faculty = await prisma.faculty.create({
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

  res.json({success: true, data: faculty});
};

export {createFaculty};
