import prisma from "~~/lib/prisma";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = await getServerSession(event);

  if (!session || !session.user) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  try {
    const property = await prisma.property.create({
      data: {
        title: body.title,
        description: body.description ?? null,
        type: body.type,
        listingType: body.listingType,
        status: "DRAFT",
        price: body.price ?? 0,
        deposit: body.deposit ?? null,
        city: body.city,
        district: body.district ?? null,
        buildingNumber: body.buildingNumber ?? null,
        street: body.street ?? null,
        latitude: body.latitude ?? null,
        longitude: body.longitude ?? null,
        sizeM2: body.sizeM2 ?? null,
        rooms: body.rooms ?? null,
        floor: body.floor ?? null,
        phone: body.phone ?? null,
        email: body.email ?? null,
        yearBuilt: body.yearBuilt ?? null,
        furnished: body.furnished ?? false,
        balcony: body.balcony ?? false,
        elevator: body.elevator ?? false,
        parking: body.parking ?? false,
        petsAllowed: body.petsAllowed ?? false,
        smokingAllowed: body.smokingAllowed ?? false,
        internet: body.internet ?? false,
        tv: body.tv ?? false,
        washingMachine: body.washingMachine ?? false,
        dishwasher: body.dishwasher ?? false,
        airConditioning: body.airConditioning ?? false,
        isShared: body.isShared ?? false,
        images: body.images ?? [],
        owner: { connect: { id: session.user.id } },
        mainImageIdx: 0,
      },
    });

    return { success: true, property };
  } catch (error) {
    console.error("Błąd tworzenia nieruchomości:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Nie udało się utworzyć nieruchomości",
    });
  }
});
