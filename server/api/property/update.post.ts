import prisma from "~~/lib/prisma";
import { requireAuth } from "../middleware/auth";
import { propertyCreateSchema } from "~/schemas/property";

export default requireAuth(
  defineEventHandler(async (event) => {
    const userId = event.context.user.id;
    const body = await readBody(event);
    const { id } = body;

    if (!id) {
      throw createError({ statusCode: 400, message: "Property ID is required" });
    }

    const validation = propertyCreateSchema.safeParse(body);
    if (!validation.success) {
      throw createError({
        statusCode: 400,
        statusMessage: "Validation failed",
      });
    }

    const property = await prisma.property.findUnique({
      where: { id },
      select: { id: true, ownerId: true },
    });

    if (!property) {
      throw createError({ statusCode: 404, message: "Property not found" });
    }

    if (property.ownerId !== userId) {
      throw createError({ statusCode: 403, message: "Unauthorized" });
    }

    const allowedFields = [
      "title",
      "description",
      "status",
      "type",
      "listingType",
      "price",
      "deposit",
      "city",
      "district",
      "street",
      "buildingNumber",
      "latitude",
      "longitude",
      "sizeM2",
      "rooms",
      "floor",
      "yearBuilt",
      "furnished",
      "balcony",
      "elevator",
      "parking",
      "petsAllowed",
      "smokingAllowed",
      "internet",
      "tv",
      "washingMachine",
      "dishwasher",
      "airConditioning",
      "isShared",
      "images",
      "roomType",
      "email",
      "phone",
      "mainImageIdx"
    ];

    const updateData: Record<string, any> = Object.fromEntries(
      Object.entries(body).filter(
        ([key, value]) => allowedFields.includes(key) && value !== undefined
      )
    );

    const { city, district, street, buildingNumber } = updateData;

    if (city || street || buildingNumber) {
      const geo = await geocodeAddress({ city, district, street, buildingNumber });
      if (geo) {
        updateData.latitude = geo.lat;
        updateData.longitude = geo.lon;
      }
    }

    try {
      const updatedProperty = await prisma.property.update({
        where: { id },
        data: updateData,
      });

      const cacheStorage = useStorage("cache:properties:property");
      await cacheStorage.removeItem(`${id}.json`.replaceAll("-", ""));

      return { success: true, property: updatedProperty };
    } catch (e: any) {
      console.error("Error updating property", e);
      throw createError({
        statusCode: 500,
        message: "Error updating property",
      });
    }
  })
);
