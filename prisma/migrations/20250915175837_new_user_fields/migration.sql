/*
  Warnings:

  - A unique constraint covering the columns `[emailVerificationCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emailVerificationCode` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "emailVerificationCode" TEXT NOT NULL,
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "provider" TEXT,
ADD COLUMN     "providerAccountId" TEXT,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_emailVerificationCode_key" ON "public"."User"("emailVerificationCode");
