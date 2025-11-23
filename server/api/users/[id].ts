import prisma from "~~/lib/prisma";
import { session } from "../middleware/session"

export default session(defineCachedEventHandler(
  async (event) => {
    const { id } = event.context.params as { id: string };
    const userId = event.context.user?.id;

    try {
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          interests: true,
          occupation: true,
          searchPreferences: true,
          searchPropertyType: true,
          noiseCompatibility: true,
          petsCompatibility: true
        },
      });

      if (!user) {
        throw createError({
          statusCode: 404,
          statusMessage: "User not found",
        });
      }

      let isBookmarked = false;
      if (userId) {
        const bookmark = await prisma.userBookmark.findUnique({
          where: {
            userId_targetId: {
              userId,
              targetId: id
            }
          }
        });
        isBookmarked = !!bookmark;
      }

      const userWithBookmark = {
        ...user,
        isBookmarked
      };

      return { success: true, user: userWithBookmark };
    } catch (error) {
      console.error(error);
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
