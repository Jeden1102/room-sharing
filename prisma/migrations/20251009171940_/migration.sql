/*
  Warnings:

  - You are about to drop the column `searchCity` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `searchDistricts` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "searchCity",
DROP COLUMN "searchDistricts",
ADD COLUMN     "city" TEXT,
ADD COLUMN     "districts" TEXT[];
