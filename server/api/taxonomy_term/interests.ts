import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  try {
    const interests = await prisma.interest.findMany({
      orderBy: { name: "asc" },
    });
    return interests;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch interests",
    });
  }
});
