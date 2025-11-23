/*
  Warnings:

  - You are about to drop the `_PropertyBookmarks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserBookmarks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PropertyBookmarks" DROP CONSTRAINT "_PropertyBookmarks_A_fkey";

-- DropForeignKey
ALTER TABLE "_PropertyBookmarks" DROP CONSTRAINT "_PropertyBookmarks_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserBookmarks" DROP CONSTRAINT "_UserBookmarks_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserBookmarks" DROP CONSTRAINT "_UserBookmarks_B_fkey";

-- DropTable
DROP TABLE "_PropertyBookmarks";

-- DropTable
DROP TABLE "_UserBookmarks";

-- CreateTable
CREATE TABLE "PropertyBookmark" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,

    CONSTRAINT "PropertyBookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBookmark" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,

    CONSTRAINT "UserBookmark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PropertyBookmark_userId_propertyId_key" ON "PropertyBookmark"("userId", "propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "UserBookmark_userId_targetId_key" ON "UserBookmark"("userId", "targetId");

-- AddForeignKey
ALTER TABLE "PropertyBookmark" ADD CONSTRAINT "PropertyBookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyBookmark" ADD CONSTRAINT "PropertyBookmark_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBookmark" ADD CONSTRAINT "UserBookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBookmark" ADD CONSTRAINT "UserBookmark_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
