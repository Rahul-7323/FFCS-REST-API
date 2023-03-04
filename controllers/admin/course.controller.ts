import {validationResult} from "express-validator";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const createCourse = async (req: any, res: any, next: any) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Invalid data provided");
    res.status(400);
    return next(error);
  }

  const {
    id,
    name,
    slot_ids,
    faculty_ids,
    course_type,
  }: {
    id: string;
    name: string;
    slot_ids: string[];
    faculty_ids: string[];
    course_type: string;
  } = req.body;

  // map the elements of arrays to objects that contain that the id
  const _slot_ids = slot_ids.map((id) => {
    return {id: id};
  });
  const _faculty_ids = faculty_ids.map((id) => {
    return {id: id};
  });

  let course;

  try {
    // making use of "nested include" because we have to include
    // the faculties and allowed slots in the response
    course = await prisma.course.create({
      data: {
        id,
        name,
        course_type,
        allowed_slots: {
          connect: _slot_ids,
        },
        faculties: {
          connect: _faculty_ids,
        },
      },
      include: {
        allowed_slots: {
          include: {
            timings: true,
          },
        },
        faculties: true,
      },
    });
  } catch (err) {
    const error = new Error("Something went wrong in the server");
    res.status(500);
    return next(error);
  }

  res.json({success: true, data: course});
};

export {createCourse};
