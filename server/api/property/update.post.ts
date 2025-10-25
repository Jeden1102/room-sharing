import prisma from "~~/lib/prisma";
import { requireAuth } from "../middleware/auth";

export default requireAuth(
  defineCachedEventHandler(
    async (event) => {
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

      try {
        const updatedProperty = await prisma.property.update({
          where: { id },
          data: {
            title: body.title,
            description: body.description,
            type: body.type,
            price: body.price,
            deposit: body.deposit,
            city: body.city,
            district: body.district,
            buildingNumber: body.buildingNumber,
            street: body.street,
            latitude: body.latitude,
            longitude: body.longitude,
            sizeM2: body.sizeM2,
            rooms: body.rooms,
            floor: body.floor,
            yearBuilt: body.yearBuilt,
            furnished: body.furnished,
            balcony: body.balcony,
            elevator: body.elevator,
            parking: body.parking,
            petsAllowed: body.petsAllowed,
            smokingAllowed: body.smokingAllowed,
            internet: body.internet,
            washingMachine: body.washingMachine,
            dishwasher: body.dishwasher,
            airConditioning: body.airConditioning,
            isShared: body.isShared,
            images: body.images,
          },
        });

        return { success: true, property: updatedProperty };
      } catch (e: any) {
        console.error("Błąd aktualizacji nieruchomości:", e);
        throw createError({
          statusCode: 500,
          message: "Błąd podczas aktualizacji nieruchomości.",
        });
      }
    },
    {
      group: "property",
      name: "property-update",
      maxAge: 0,
    },
  ),
);
