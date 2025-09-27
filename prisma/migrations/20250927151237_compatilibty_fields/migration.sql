/*
  Warnings:

  - You are about to drop the column `roommatePreferenceId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `RoommatePreference` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RoommatePreference" DROP CONSTRAINT "RoommatePreference_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roommatePreferenceId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "roommatePreferenceId",
ADD COLUMN     "searchAmount" TEXT;

-- DropTable
DROP TABLE "RoommatePreference";

-- CreateTable
CREATE TABLE "Occupation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Occupation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preferance" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Preferance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyOption" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PropertyOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NoiseCompatibility" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "NoiseCompatibility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetsCompatibility" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PetsCompatibility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OccupationToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PreferanceToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PropertyOptionToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_NoiseCompatibilityToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PetsCompatibilityToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Occupation_name_key" ON "Occupation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Preferance_name_key" ON "Preferance"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyOption_name_key" ON "PropertyOption"("name");

-- CreateIndex
CREATE UNIQUE INDEX "NoiseCompatibility_name_key" ON "NoiseCompatibility"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PetsCompatibility_name_key" ON "PetsCompatibility"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_OccupationToUser_AB_unique" ON "_OccupationToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_OccupationToUser_B_index" ON "_OccupationToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PreferanceToUser_AB_unique" ON "_PreferanceToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PreferanceToUser_B_index" ON "_PreferanceToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PropertyOptionToUser_AB_unique" ON "_PropertyOptionToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PropertyOptionToUser_B_index" ON "_PropertyOptionToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NoiseCompatibilityToUser_AB_unique" ON "_NoiseCompatibilityToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_NoiseCompatibilityToUser_B_index" ON "_NoiseCompatibilityToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PetsCompatibilityToUser_AB_unique" ON "_PetsCompatibilityToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PetsCompatibilityToUser_B_index" ON "_PetsCompatibilityToUser"("B");

-- AddForeignKey
ALTER TABLE "_OccupationToUser" ADD CONSTRAINT "_OccupationToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Occupation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OccupationToUser" ADD CONSTRAINT "_OccupationToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PreferanceToUser" ADD CONSTRAINT "_PreferanceToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Preferance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PreferanceToUser" ADD CONSTRAINT "_PreferanceToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyOptionToUser" ADD CONSTRAINT "_PropertyOptionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "PropertyOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyOptionToUser" ADD CONSTRAINT "_PropertyOptionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NoiseCompatibilityToUser" ADD CONSTRAINT "_NoiseCompatibilityToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "NoiseCompatibility"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NoiseCompatibilityToUser" ADD CONSTRAINT "_NoiseCompatibilityToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PetsCompatibilityToUser" ADD CONSTRAINT "_PetsCompatibilityToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "PetsCompatibility"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PetsCompatibilityToUser" ADD CONSTRAINT "_PetsCompatibilityToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
