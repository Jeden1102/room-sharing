import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  try {
    const lifestyles = await prisma.lifestyle.findMany({
      orderBy: { name: "asc" },
    });
    return lifestyles;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch lifestyles",
    });
  }
});
