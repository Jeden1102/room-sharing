-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('PRIVATE', 'BUSINESS');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accountType" "UserType" NOT NULL DEFAULT 'PRIVATE',
ADD COLUMN     "address" TEXT,
ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "nip" TEXT,
ADD COLUMN     "website" TEXT;
