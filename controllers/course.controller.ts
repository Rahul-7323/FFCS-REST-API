import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const getCourseById = async (req: any, res: any, next: any) => {
  const courseId = req.params.id;
  let course;

  try {
    course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });
  } catch (err) {
    const error = new Error("Something went wrong in the server");
    res.status(500);
    return next(error);
  }

  if (!course) {
    const error = new Error("Could not find any course with the given id");
    res.status(404);
    return next(error);
  }

  res.json({success: true, data: course});
};

const getCourses = async (req: any, res: any, next: any) => {
  let courses;

  try {
    courses = await prisma.course.findMany();
  } catch (err) {
    const error = new Error("Something went wrong in the server");
    res.status(500);
    return next(error);
  }

  if (!courses || courses.length === 0) {
    const error = new Error("Could not find any courses");
    res.status(404);
    return next(error);
  }

  res.json({success: true, data: courses});
};

export {getCourseById, getCourses};
