-- DropForeignKey
ALTER TABLE "PropertyBookmark" DROP CONSTRAINT "PropertyBookmark_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_reportedPropertyId_fkey";

-- AddForeignKey
ALTER TABLE "PropertyBookmark" ADD CONSTRAINT "PropertyBookmark_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_reportedPropertyId_fkey" FOREIGN KEY ("reportedPropertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
