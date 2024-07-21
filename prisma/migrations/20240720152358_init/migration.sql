/*
  Warnings:

  - You are about to drop the column `userId` on the `Score` table. All the data in the column will be lost.
  - Added the required column `email` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_userId_fkey";

-- AlterTable
ALTER TABLE "Score" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL;
