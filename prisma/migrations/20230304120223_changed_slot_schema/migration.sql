-- DropForeignKey
ALTER TABLE "Slot" DROP CONSTRAINT "Slot_courseId_fkey";

-- CreateTable
CREATE TABLE "_CourseToSlot" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToSlot_AB_unique" ON "_CourseToSlot"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToSlot_B_index" ON "_CourseToSlot"("B");

-- AddForeignKey
ALTER TABLE "_CourseToSlot" ADD CONSTRAINT "_CourseToSlot_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToSlot" ADD CONSTRAINT "_CourseToSlot_B_fkey" FOREIGN KEY ("B") REFERENCES "Slot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
