import prisma from "~~/lib/prisma";
import { requireAuth } from "../middleware/auth";

export default requireAuth(
  defineEventHandler(
    async (event) => {
      const userId = event.context.user.id;

      try {
        const properties = await prisma.property.findMany({
          where: { ownerId: userId },
          select: { 
            id: true,
            status: true,
            title: true,
            price: true,
            city: true,
            district: true,
            street: true,
            sizeM2: true,
            rooms: true,
            images: true,
            type: true,
            listingType: true,
           },
           orderBy: { createdAt: "desc" },
        });
        
        return { success: true, properties };
      } catch (error) {
        throw createError({ statusCode: 404, message: "Błąd pobierania nieruchomości" });
      }
    },
  ),
);
