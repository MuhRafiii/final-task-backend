/*
  Warnings:

  - You are about to drop the column `points` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "points";

-- CreateTable
CREATE TABLE "Point" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "points" INTEGER NOT NULL,

    CONSTRAINT "Point_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Point_email_key" ON "Point"("email");

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
