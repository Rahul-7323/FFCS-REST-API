import {PrismaClient} from "@prisma/client";

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

export {getStudentById, getStudents};
