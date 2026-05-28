/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Step` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Step" DROP COLUMN "createdAt";
