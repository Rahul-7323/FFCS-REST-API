import {validationResult} from "express-validator";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const register = async (req: any, res: any, next: any) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Invalid data provided");
    res.status(400);
    return next(error);
  }

  const {
    course_id,
    faculty_id,
    slot_ids,
  }: {course_id: string; faculty_id: string; slot_ids: string[]} = req.body;

  // We have to check 4 things
  // 1. Whether we have registered for this course already
  // 2. Whether the given faculty teaches the given course
  // 3. Whether the given slot ids belong to the given course
  // 4. Whether the given slot ids have not been choosen before for some other course
  // we assume that all faculties for a course are available at all slots

  // get the student id from the request object after the student has authenticated
  const studentId = req.user.id;

  /////////////////////////////////////////////////////////////////////////////////////////
  // get the course with the given id
  let course;

  try {
    course = await prisma.course.findUnique({
      where: {
        id: course_id,
      },
      include: {
        allowed_slots: true,
        faculties: true,
      },
    });
  } catch (err) {
    const error = new Error("Something went wrong in the server");
    console.log(1);
    res.status(500);
    return next(error);
  }

  if (!course) {
    const error = new Error("Could not find any course with the given id");
    res.status(404);
    return next(error);
  }

  const _course = {
    id: course.id,
    name: course.name,
    course_type: course.course_type,
    slot_ids: course.allowed_slots.map((slot) => slot.id),
    faculty_ids: course.faculties.map((faculty) => faculty.id),
  };
  /////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////
  // check if the given faculty teaches the course
  if (!_course.faculty_ids.includes(faculty_id)) {
    const error = new Error(
      "The specified faculty does not teach the given course"
    );
    res.status(400);
    return next(error);
  }
  /////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////
  // check if the given slots belong to the slots of the given course
  let isValidSlots = true;

  for (let i = 0; i < slot_ids.length; i++) {
    if (!_course.slot_ids.includes(slot_ids[i])) {
      isValidSlots = false;
      break;
    }
  }

  if (!isValidSlots) {
    const error = new Error(
      "The provided slots do not belong to the given course"
    );
    res.status(400);
    return next(error);
  }
  /////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////
  // check if the slots don't clash
  let prev_selected_slots;

  try {
    prev_selected_slots = await prisma.selectedSlot.findMany({
      where: {
        studentId: studentId,
      },
      select: {
        slotId: true,
      },
    });
  } catch (err) {
    const error = new Error("Something went wrong in the server");
    console.log(2);
    res.status(500);
    return next(error);
  }

  const prev_selected_slot_ids = prev_selected_slots.map((slot) => slot.slotId);

  let slotsClash = false;

  for (let i = 0; i < slot_ids.length; i++) {
    if (prev_selected_slot_ids.includes(slot_ids[i])) {
      slotsClash = true;
      break;
    }
  }

  if (slotsClash) {
    const error = new Error(
      "The provided slots clash with other slots previously registered"
    );
    res.status(400);
    return next(error);
  }
  /////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////
  const selected_slots = slot_ids.map((slotId) => {
    return {
      slotId: slotId,
    };
  });

  try {
    await prisma.studentCourseRegister.create({
      data: {
        studentId: studentId,
        courseId: course_id,
        facultyId: faculty_id,
        selected_slots: {
          createMany: {
            data: selected_slots,
          },
        },
      },
    });
  } catch (err) {
    const error = new Error("Something went wrong in the server");
    res.status(500);
    return next(error);
  }

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
    console.log(4);
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

  /////////////////////////////////////////////////////////////////////////////////////////

  res.json({success: true, data: _student});
};

export {register};
