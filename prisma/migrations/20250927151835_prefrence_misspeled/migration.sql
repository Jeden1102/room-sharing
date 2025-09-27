/*
  Warnings:

  - You are about to drop the column `lifestyleId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Lifestyle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Preferance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PreferanceToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_lifestyleId_fkey";

-- DropForeignKey
ALTER TABLE "_PreferanceToUser" DROP CONSTRAINT "_PreferanceToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PreferanceToUser" DROP CONSTRAINT "_PreferanceToUser_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "lifestyleId";

-- DropTable
DROP TABLE "Lifestyle";

-- DropTable
DROP TABLE "Preferance";

-- DropTable
DROP TABLE "_PreferanceToUser";

-- CreateTable
CREATE TABLE "SearchPreference" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SearchPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SearchPreferenceToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SearchPreference_name_key" ON "SearchPreference"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_SearchPreferenceToUser_AB_unique" ON "_SearchPreferenceToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SearchPreferenceToUser_B_index" ON "_SearchPreferenceToUser"("B");

-- AddForeignKey
ALTER TABLE "_SearchPreferenceToUser" ADD CONSTRAINT "_SearchPreferenceToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "SearchPreference"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SearchPreferenceToUser" ADD CONSTRAINT "_SearchPreferenceToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
