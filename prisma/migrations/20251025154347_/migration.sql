/*
  Warnings:

  - The values [RENTED,SOLD] on the enum `PropertyStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PropertyStatus_new" AS ENUM ('DRAFT', 'ACTIVE', 'RESERVED');
ALTER TABLE "Property" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Property" ALTER COLUMN "status" TYPE "PropertyStatus_new" USING ("status"::text::"PropertyStatus_new");
ALTER TYPE "PropertyStatus" RENAME TO "PropertyStatus_old";
ALTER TYPE "PropertyStatus_new" RENAME TO "PropertyStatus";
DROP TYPE "PropertyStatus_old";
ALTER TABLE "Property" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;

-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
