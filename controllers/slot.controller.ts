import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const getSlotById = async (req: any, res: any, next: any) => {
  const slotId = req.params.id;
  let slot;

  try {
    slot = await prisma.slot.findUnique({
      where: {
        id: slotId,
      },
    });
  } catch (err) {
    const error = new Error("Something went wrong in the server");
    res.status(500);
    return next(error);
  }

  if (!slot) {
    const error = new Error("Could not find any slot with the given id");
    res.status(404);
    return next(error);
  }

  res.json({success: true, data: slot});
};

const getSlots = async (req: any, res: any, next: any) => {
  let slots;

  try {
    slots = await prisma.slot.findMany();
  } catch (err) {
    const error = new Error("Something went wrong in the server");
    res.status(500);
    return next(error);
  }

  if (!slots || slots.length === 0) {
    const error = new Error("Could not find any slots");
    res.status(404);
    return next(error);
  }

  res.json({success: true, data: slots});
};

export {getSlotById, getSlots};
