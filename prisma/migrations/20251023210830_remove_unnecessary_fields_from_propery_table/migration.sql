/*
  Warnings:

  - You are about to drop the column `currency` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `floorPlanUrl` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_recipientId_fkey";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "currency",
DROP COLUMN "floorPlanUrl",
DROP COLUMN "postalCode",
DROP COLUMN "videoUrl";

-- DropTable
DROP TABLE "Review";
