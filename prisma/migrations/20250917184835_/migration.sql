/*
  Warnings:

  - The primary key for the `_PropertyRoommates` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[passwordResetCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_PropertyRoommates` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passwordResetCode" TEXT;

-- AlterTable
ALTER TABLE "_PropertyRoommates" DROP CONSTRAINT "_PropertyRoommates_AB_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "User_passwordResetCode_key" ON "User"("passwordResetCode");

-- CreateIndex
CREATE UNIQUE INDEX "_PropertyRoommates_AB_unique" ON "_PropertyRoommates"("A", "B");
