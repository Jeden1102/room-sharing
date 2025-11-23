import prisma from "~~/lib/prisma";
import { session } from "../middleware/session";

export default session(eventHandler(async (event) => {
  const { id } = event.context.params as { id: string };
  const { entity }: { entity: 'user' | 'property' } = getQuery(event);
  const userId = event.context.user.id;

  try {
    if (entity === "user") {
      await prisma.userBookmark.deleteMany({
        where: {
          userId,
          targetId: id
        }
      });

      await useStorage("cache:users:user").removeItem(
        `${id}.json`.replaceAll("-", "")
      );

    } else if (entity === "property") {
      await prisma.propertyBookmark.deleteMany({
        where: {
          userId,
          propertyId: id
        }
      });

      await useStorage("cache:properties:property").removeItem(
        `${id}.json`.replaceAll("-", "")
      );

    } else {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid entity type. Must be 'user' or 'property'"
      });
    }

    return { success: true, message: "Bookmark removed" };

  } catch (error) {
    console.error("Error removing bookmark:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to remove bookmark"
    });
  }
}));
