import prisma from "~~/lib/prisma";

export default defineCachedEventHandler(
  async (event) => {
    const { id } = event.context.params as { id: string };

    try {
      const user = await prisma.user.findUnique({
        where: { id: id },
        include: {
          interests: true,
          occupation: true,
          searchPreferences: true,
          searchPropertyType: true,
          noiseCompatibility: true,
          petsCompatibility: true,
        },
      });

      if (!user) {
        throw createError({
          statusCode: 404,
          statusMessage: "User not found",
        });
      }
      return { success: true, user };
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to get user",
      });
    }
  },
  {
    maxAge: 60 * 60,
    group: "users",
    name: "user",
    getKey: (event) => event.context.params.id,
  },
);
