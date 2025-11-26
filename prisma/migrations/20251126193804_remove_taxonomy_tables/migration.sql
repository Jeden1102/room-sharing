/*
  Warnings:

  - You are about to drop the `Interest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NoiseCompatibility` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Occupation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PetsCompatibility` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PropertyOption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SearchPreference` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_InterestToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_NoiseCompatibilityToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OccupationToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PetsCompatibilityToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PropertyOptionToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SearchPreferenceToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_InterestToUser" DROP CONSTRAINT "_InterestToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_InterestToUser" DROP CONSTRAINT "_InterestToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_NoiseCompatibilityToUser" DROP CONSTRAINT "_NoiseCompatibilityToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_NoiseCompatibilityToUser" DROP CONSTRAINT "_NoiseCompatibilityToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_OccupationToUser" DROP CONSTRAINT "_OccupationToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_OccupationToUser" DROP CONSTRAINT "_OccupationToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_PetsCompatibilityToUser" DROP CONSTRAINT "_PetsCompatibilityToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PetsCompatibilityToUser" DROP CONSTRAINT "_PetsCompatibilityToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_PropertyOptionToUser" DROP CONSTRAINT "_PropertyOptionToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PropertyOptionToUser" DROP CONSTRAINT "_PropertyOptionToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_SearchPreferenceToUser" DROP CONSTRAINT "_SearchPreferenceToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_SearchPreferenceToUser" DROP CONSTRAINT "_SearchPreferenceToUser_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "interests" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "noiseCompatibility" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "occupations" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "petsCompatibility" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "searchPreferences" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "searchPropertyTypes" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- DropTable
DROP TABLE "Interest";

-- DropTable
DROP TABLE "NoiseCompatibility";

-- DropTable
DROP TABLE "Occupation";

-- DropTable
DROP TABLE "PetsCompatibility";

-- DropTable
DROP TABLE "PropertyOption";

-- DropTable
DROP TABLE "SearchPreference";

-- DropTable
DROP TABLE "_InterestToUser";

-- DropTable
DROP TABLE "_NoiseCompatibilityToUser";

-- DropTable
DROP TABLE "_OccupationToUser";

-- DropTable
DROP TABLE "_PetsCompatibilityToUser";

-- DropTable
DROP TABLE "_PropertyOptionToUser";

-- DropTable
DROP TABLE "_SearchPreferenceToUser";
