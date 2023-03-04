import {validationResult} from "express-validator";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const createSlot = async (req: any, res: any, next: any) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Invalid data provided");
    res.status(400);
    return next(error);
  }

  const {id, timings}: {id: string; timings: any[]} = req.body;

  let slot;

  try {
    slot = await prisma.slot.create({
      data: {
        id,
        timings: {
          createMany: {
            data: timings,
          },
        },
      },
      include: {
        timings: {
          select: {
            day: true,
            start: true,
            end: true,
          },
        },
      },
    });
  } catch (err) {
    const error = new Error("Something went wrong in the server");
    res.status(500);
    return next(error);
  }

  res.json({success: true, data: slot});
};

export {createSlot};
