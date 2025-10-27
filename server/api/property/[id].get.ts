import prisma from "~~/lib/prisma";

export default defineCachedEventHandler(
  async (event) => {
    const { id } = event.context.params as { id: string };

    try {
      const property = await prisma.property.findUnique({
        where: { id: id },
        include: {
            owner: true
        }
      });

      if (!property) {
        throw createError({
          statusCode: 404,
          statusMessage: "Property not found",
        });
      }
      return { success: true, property };
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to get property",
      });
    }
  },
  {
    maxAge: 60 * 60,
    group: "properties",
    name: "property",
    getKey: (event) => event.context.params.id,
  },
);
