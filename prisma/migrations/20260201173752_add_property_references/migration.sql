/*
  Warnings:

  - The `type` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('APARTMENT', 'HOUSE', 'ROOM', 'STUDIO', 'LOFT');

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "parentId" TEXT,
DROP COLUMN "type",
ADD COLUMN     "type" "PropertyType";

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;
