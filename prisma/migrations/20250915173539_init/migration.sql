-- CreateEnum
CREATE TYPE "public"."PropertyType" AS ENUM ('RENT', 'SALE', 'FLATSHARE');

-- CreateEnum
CREATE TYPE "public"."PropertyStatus" AS ENUM ('ACTIVE', 'RESERVED', 'RENTED', 'SOLD');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "displayName" TEXT,
    "age" INTEGER,
    "gender" TEXT,
    "bio" TEXT,
    "profileImage" TEXT,
    "interests" TEXT[],
    "lifestyle" TEXT,
    "smoker" BOOLEAN,
    "pets" BOOLEAN,
    "occupation" TEXT,
    "budgetMax" INTEGER,
    "roommatePreferenceId" TEXT,
    "propertyId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Property" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "public"."PropertyType" NOT NULL,
    "status" "public"."PropertyStatus" NOT NULL DEFAULT 'ACTIVE',
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "deposit" INTEGER,
    "utilities" INTEGER,
    "city" TEXT NOT NULL,
    "district" TEXT,
    "street" TEXT,
    "postalCode" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "sizeM2" INTEGER,
    "rooms" INTEGER,
    "bathrooms" INTEGER,
    "floor" INTEGER,
    "yearBuilt" INTEGER,
    "furnished" BOOLEAN,
    "condition" TEXT,
    "balcony" BOOLEAN,
    "elevator" BOOLEAN,
    "parking" BOOLEAN,
    "petsAllowed" BOOLEAN,
    "smokingAllowed" BOOLEAN,
    "internet" BOOLEAN,
    "washingMachine" BOOLEAN,
    "dishwasher" BOOLEAN,
    "airConditioning" BOOLEAN,
    "isShared" BOOLEAN DEFAULT false,
    "roomType" TEXT,
    "images" TEXT[],
    "videoUrl" TEXT,
    "floorPlanUrl" TEXT,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RoommatePreference" (
    "id" TEXT NOT NULL,
    "minAge" INTEGER,
    "maxAge" INTEGER,
    "gender" TEXT,
    "lifestyle" TEXT,
    "isStudent" BOOLEAN,
    "isWorker" BOOLEAN,
    "propertyId" TEXT NOT NULL,

    CONSTRAINT "RoommatePreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Review" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "authorId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Message" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_PropertyRoommates" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PropertyRoommates_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RoommatePreference_propertyId_key" ON "public"."RoommatePreference"("propertyId");

-- CreateIndex
CREATE INDEX "_PropertyRoommates_B_index" ON "public"."_PropertyRoommates"("B");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_roommatePreferenceId_fkey" FOREIGN KEY ("roommatePreferenceId") REFERENCES "public"."RoommatePreference"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Property" ADD CONSTRAINT "Property_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RoommatePreference" ADD CONSTRAINT "RoommatePreference_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PropertyRoommates" ADD CONSTRAINT "_PropertyRoommates_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PropertyRoommates" ADD CONSTRAINT "_PropertyRoommates_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
