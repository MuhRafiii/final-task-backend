-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;
