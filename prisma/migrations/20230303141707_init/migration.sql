-- CreateTable
CREATE TABLE "Faculty" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "course_type" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slot" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Timing" (
    "day" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "slotId" TEXT NOT NULL,

    CONSTRAINT "Timing_pkey" PRIMARY KEY ("slotId","day","start","end")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentCourseRegister" (
    "studentId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "StudentCourseRegister_pkey" PRIMARY KEY ("studentId","courseId")
);

-- CreateTable
CREATE TABLE "SelectedSlot" (
    "slotId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "SelectedSlot_pkey" PRIMARY KEY ("slotId","studentId","courseId")
);

-- CreateTable
CREATE TABLE "_CourseToFaculty" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToFaculty_AB_unique" ON "_CourseToFaculty"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToFaculty_B_index" ON "_CourseToFaculty"("B");

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timing" ADD CONSTRAINT "Timing_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "Slot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCourseRegister" ADD CONSTRAINT "StudentCourseRegister_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCourseRegister" ADD CONSTRAINT "StudentCourseRegister_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelectedSlot" ADD CONSTRAINT "SelectedSlot_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "Slot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelectedSlot" ADD CONSTRAINT "SelectedSlot_studentId_courseId_fkey" FOREIGN KEY ("studentId", "courseId") REFERENCES "StudentCourseRegister"("studentId", "courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToFaculty" ADD CONSTRAINT "_CourseToFaculty_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToFaculty" ADD CONSTRAINT "_CourseToFaculty_B_fkey" FOREIGN KEY ("B") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;
