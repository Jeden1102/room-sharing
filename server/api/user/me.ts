import { PrismaClient } from "@prisma/client";
import { requireAuth } from "../middleware/auth";

const prisma = new PrismaClient();

export default requireAuth(
  defineEventHandler(async (event) => {
    const userId = event.context.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        interests: true,
        occupation: true,
        searchPreferences: true,
        searchPropertyType: true,
        noiseCompatibility: true,
        petsCompatibility: true,
      },
    });

    return { success: true, user };
  }),
);
