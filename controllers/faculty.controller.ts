import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const getFacultyById = async (req: any, res: any, next: any) => {
  const facultyId = req.params.id;
  let faculty;

  try {
    faculty = await prisma.faculty.findUnique({
      where: {
        id: facultyId,
      },
    });
  } catch (err) {
    const error = new Error("Something went wrong in the server");
    res.status(500);
    return next(error);
  }

  if (!faculty) {
    const error = new Error("Could not find any faculty with the given id");
    res.status(404);
    return next(error);
  }

  res.json({success: true, data: faculty});
};

const getFaculties = async (req: any, res: any, next: any) => {
  let faculties;

  try {
    faculties = await prisma.faculty.findMany();
  } catch (err) {
    const error = new Error("Something went wrong in the server");
    res.status(500);
    return next(error);
  }

  if (!faculties || faculties.length === 0) {
    const error = new Error("Could not find any faculties");
    res.status(404);
    return next(error);
  }

  res.json({success: true, data: faculties});
};

export {getFacultyById, getFaculties};
