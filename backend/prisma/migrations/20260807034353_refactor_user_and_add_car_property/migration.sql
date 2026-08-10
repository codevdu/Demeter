/*
  Warnings:

  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `localId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Local` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `localUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cpfCnpj]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpfCnpj` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_localId_fkey";

-- DropForeignKey
ALTER TABLE "localUser" DROP CONSTRAINT "localUser_localId_fkey";

-- DropForeignKey
ALTER TABLE "localUser" DROP CONSTRAINT "localUser_userId_fkey";

-- DropIndex
DROP INDEX "User_profile_idx";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "created_at",
DROP COLUMN "localId",
DROP COLUMN "updated_at",
ADD COLUMN     "cpfCnpj" TEXT NOT NULL,
ADD COLUMN     "municipalityId" INTEGER,
ADD COLUMN     "state" TEXT,
ALTER COLUMN "profile" SET DEFAULT 'PRODUTOR';

-- DropTable
DROP TABLE "Local";

-- DropTable
DROP TABLE "localUser";

-- CreateTable
CREATE TABLE "CarProperty" (
    "id" TEXT NOT NULL,
    "carReceipt" TEXT NOT NULL,
    "farmName" TEXT NOT NULL,
    "municipalityId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CarProperty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CarProperty_carReceipt_key" ON "CarProperty"("carReceipt");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpfCnpj_key" ON "User"("cpfCnpj");

-- AddForeignKey
ALTER TABLE "CarProperty" ADD CONSTRAINT "CarProperty_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
