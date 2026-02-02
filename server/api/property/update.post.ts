import prisma from "~~/lib/prisma";
import { requireAuth } from "../middleware/auth";
import { propertyCreateSchema } from "~/schemas/property";
import { medias, amenityValues } from "~/constants/taxonomies";

export default requireAuth(
  defineEventHandler(async (event) => {
    const userId = event.context.user.id;
    const body = await readBody(event);
    const { id, subPropertyIds } = body;

    if (!id) {
      throw createError({
        statusCode: 400,
        message: "Property ID is required",
      });
    }

    const validation = propertyCreateSchema.safeParse(body);
    if (!validation.success) {
      throw createError({
        statusCode: 400,
        statusMessage: "api.login.validationFailed",
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
      "isShared",
      "images",
      "roomType",
      "email",
      "phone",
      "mainImageIdx",
      "parentId",
      ...amenityValues,
      ...medias,
    ];

    const updateData: Record<string, any> = Object.fromEntries(
      Object.entries(body).filter(
        ([key, value]) => allowedFields.includes(key) && value !== undefined,
      ),
    );

    const { city, district, street, buildingNumber } = updateData;

    if (!updateData.parentId && (city || street || buildingNumber)) {
      const geo = await geocodeAddress({
        city,
        district,
        street,
        buildingNumber,
      });
      if (geo) {
        updateData.latitude = geo.lat;
        updateData.longitude = geo.lon;
      }
    }

    try {
      if (updateData.parentId) {
        const pId = updateData.parentId;
        delete updateData.parentId;
        updateData.parent = { connect: { id: pId } };
      } else if (updateData.parentId === null) {
        delete updateData.parentId;
        updateData.parent = { disconnect: true };
      }

      if (subPropertyIds && Array.isArray(subPropertyIds)) {
        updateData.subProperties = {
          set: subPropertyIds.map((sid: string) => ({ id: sid })),
        };
      }

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
  }),
);
