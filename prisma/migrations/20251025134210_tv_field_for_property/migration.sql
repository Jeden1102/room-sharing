/*
  Warnings:

  - You are about to drop the column `utilities` on the `Property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "utilities",
ADD COLUMN     "tv" BOOLEAN;
