import prisma from "~~/lib/prisma";
import { session } from "../middleware/session"

export default session(defineCachedEventHandler(
  async (event) => {
    const { id } = event.context.params as { id: string };
    const userId = event.context.user?.id;

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
          bookmarkedByUsers: userId ? {
            where: { id: userId },
            select: { id: true }
          } : false
        },
      });

      if (!user) {
        throw createError({
          statusCode: 404,
          statusMessage: "User not found",
        });
      }

      const userWithBookmark = {
        ...user,
        isBookmarked: userId ? user.bookmarkedByUsers.length > 0 : false,
        bookmarkedByUsers: undefined
      };

      return { success: true, user: userWithBookmark };
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
));