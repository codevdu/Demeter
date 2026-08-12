-- DropForeignKey
ALTER TABLE "CarProperty" DROP CONSTRAINT "CarProperty_userId_fkey";

-- AddForeignKey
ALTER TABLE "CarProperty" ADD CONSTRAINT "CarProperty_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
