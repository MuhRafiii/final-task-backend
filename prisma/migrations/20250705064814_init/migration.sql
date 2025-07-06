/*
  Warnings:

  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `profile` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "image",
ADD COLUMN     "picture" TEXT NOT NULL DEFAULT 'placeholder.png';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profile",
ADD COLUMN     "picture" TEXT NOT NULL DEFAULT 'default.png';
