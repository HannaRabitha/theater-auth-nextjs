/*
  Warnings:

  - You are about to drop the column `jurusan` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `kelas` on the `User` table. All the data in the column will be lost.
  - Added the required column `class` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `major` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "jurusan",
DROP COLUMN "kelas",
ADD COLUMN     "class" INTEGER NOT NULL,
ADD COLUMN     "major" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;
