/*
  Warnings:

  - Added the required column `facultyId` to the `StudentCourseRegister` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentCourseRegister" ADD COLUMN     "facultyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "StudentCourseRegister" ADD CONSTRAINT "StudentCourseRegister_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
