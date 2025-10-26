import prisma from "~~/lib/prisma";
import { requireAuth } from "../middleware/auth";

export default requireAuth(
  defineEventHandler(async (event) => {
    const userId = event.context.user.id;
    const body = await readBody(event);
    const { id } = body;

    if (!id) {
      throw createError({ statusCode: 400, message: "Brak ID nieruchomości" });
    }

    const property = await prisma.property.findUnique({
      where: { id },
      select: { id: true, ownerId: true },
    });

    if (!property) {
      throw createError({ statusCode: 404, message: "Nieruchomość nie znaleziona" });
    }

    if (property.ownerId !== userId) {
      throw createError({ statusCode: 403, message: "Brak uprawnień do edycji" });
    }

    const allowedFields = [
      "title",
      "description",
      "status",
      "type",
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
    ];

    const updateData = Object.fromEntries(
      Object.entries(body).filter(
        ([key, value]) => allowedFields.includes(key) && value !== undefined
      )
    );

    try {
      const updatedProperty = await prisma.property.update({
        where: { id },
        data: updateData,
      });

      return { success: true, property: updatedProperty };
    } catch (e: any) {
      console.error("Błąd aktualizacji nieruchomości:", e);
      throw createError({
        statusCode: 500,
        message: "Błąd podczas aktualizacji nieruchomości.",
      });
    }
  })
);
