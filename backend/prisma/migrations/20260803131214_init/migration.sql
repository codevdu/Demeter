-- CreateEnum
CREATE TYPE "Profile" AS ENUM ('PRODUTOR', 'TECNICO', 'GESTOR');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profile" "Profile" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "localId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "localUser" (
    "userId" TEXT NOT NULL,
    "localId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "localUser_pkey" PRIMARY KEY ("userId","localId")
);

-- CreateTable
CREATE TABLE "Local" (
    "id" TEXT NOT NULL,
    "IBGE_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "uf" TEXT NOT NULL DEFAULT 'CE',

    CONSTRAINT "Local_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_profile_idx" ON "User"("profile");

-- CreateIndex
CREATE UNIQUE INDEX "Local_IBGE_id_key" ON "Local"("IBGE_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_localId_fkey" FOREIGN KEY ("localId") REFERENCES "Local"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localUser" ADD CONSTRAINT "localUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localUser" ADD CONSTRAINT "localUser_localId_fkey" FOREIGN KEY ("localId") REFERENCES "Local"("id") ON DELETE CASCADE ON UPDATE CASCADE;
