import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    const data = await prisma.user.findMany();

    return data;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch users",
    });
  }
});
