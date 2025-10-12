import prisma from "~~/lib/prisma";

export default defineCachedEventHandler(
  async (event) => {
    try {
      const data = await prisma.user.findMany();

      console.log(data, "HERE");

      return data;
    } catch (error) {
      console.error(error);
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to fetch users",
      });
    }
  },
  { maxAge: 60 * 60 },
);
