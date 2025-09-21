/*
  Warnings:

  - You are about to drop the `District` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DistrictToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DistrictToUser" DROP CONSTRAINT "_DistrictToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_DistrictToUser" DROP CONSTRAINT "_DistrictToUser_B_fkey";

-- DropTable
DROP TABLE "District";

-- DropTable
DROP TABLE "_DistrictToUser";
