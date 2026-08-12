/*
  Warnings:

  - You are about to drop the column `farmName` on the `CarProperty` table. All the data in the column will be lost.
  - Added the required column `municipality` to the `CarProperty` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CarProperty" DROP COLUMN "farmName",
ADD COLUMN     "municipality" TEXT NOT NULL;
