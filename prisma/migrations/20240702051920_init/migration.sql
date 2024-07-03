/*
  Warnings:

  - You are about to drop the column `class` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `major` on the `User` table. All the data in the column will be lost.
  - Added the required column `jurusan` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kelas` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "class",
DROP COLUMN "major",
ADD COLUMN     "jurusan" TEXT NOT NULL,
ADD COLUMN     "kelas" INTEGER NOT NULL;
