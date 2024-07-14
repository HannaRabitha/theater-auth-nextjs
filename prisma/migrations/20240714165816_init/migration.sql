/*
  Warnings:

  - You are about to drop the column `content` on the `Materi` table. All the data in the column will be lost.
  - Added the required column `category` to the `Materi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Materi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `Materi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Materi" DROP COLUMN "content",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "link" TEXT NOT NULL;
