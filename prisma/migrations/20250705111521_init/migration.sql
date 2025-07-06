/*
  Warnings:

  - Added the required column `total` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Point" ALTER COLUMN "points" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;
