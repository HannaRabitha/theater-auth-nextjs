/*
  Warnings:

  - You are about to drop the `Qustion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Qustion";

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer1" TEXT NOT NULL,
    "answer2" TEXT NOT NULL,
    "answer3" TEXT NOT NULL,
    "answer4" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);
