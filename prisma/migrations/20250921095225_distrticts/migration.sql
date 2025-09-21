-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" TEXT,
ADD COLUMN     "searchCity" TEXT;

-- CreateTable
CREATE TABLE "District" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DistrictToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "District_name_city_key" ON "District"("name", "city");

-- CreateIndex
CREATE UNIQUE INDEX "_DistrictToUser_AB_unique" ON "_DistrictToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_DistrictToUser_B_index" ON "_DistrictToUser"("B");

-- AddForeignKey
ALTER TABLE "_DistrictToUser" ADD CONSTRAINT "_DistrictToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "District"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DistrictToUser" ADD CONSTRAINT "_DistrictToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
