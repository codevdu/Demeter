/*
  Warnings:

  - You are about to drop the column `municipalityId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "municipalityId",
ADD COLUMN     "coordinates" TEXT;
