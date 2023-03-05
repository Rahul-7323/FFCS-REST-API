import {validationResult} from "express-validator";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const getTimetable = async (req: any, res: any, next: any) => {
  // get the student id from the request object after the student has authenticated
  const studentId = req.user.id;

  let student;

  try {
    student = await prisma.student.findUnique({
      where: {
        id: studentId,
      },
      include: {
        registered_courses: {
          include: {
            course: true,
            selected_slots: {
              include: {
                slot: true,
              },
            },
          },
        },
      },
    });
  } catch (err) {
    const error = new Error("Something went wrong in the server");
    res.status(500);
    return next(error);
  }

  const _registered_courses = student?.registered_courses.map(
    (registered_course) => {
      return {
        course: registered_course.course,
        slots: registered_course.selected_slots.map(
          (selected_slot) => selected_slot.slot
        ),
      };
    }
  );

  const _student = {
    id: student?.id,
    name: student?.name,
    registered_courses: _registered_courses,
  };

  res.json({success: true, data: _student});
};

export {getTimetable};
