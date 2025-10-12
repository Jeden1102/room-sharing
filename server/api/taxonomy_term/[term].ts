import prisma from "~~/lib/prisma";

export default defineCachedEventHandler(
  async (event) => {
    try {
      const { term } = event.context.params as { term: string };

      const data = await (prisma as any)[term].findMany({
        orderBy: { name: "asc" },
      });

      return data;
    } catch (error) {
      console.error(error);
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to fetch taxonomy data",
      });
    }
  },
  { maxAge: 60 * 60 },
);
