import prisma from "~~/lib/prisma";
import { session } from "../middleware/session"

export default session(defineCachedEventHandler(
  async (event) => {
    const { id } = event.context.params as { id: string };
    const userId = event.context.user?.id;
    const getSimilar = getQuery(event).getSimilar === 'true';

    try {
      const user = await prisma.user.findUnique({
        where: { id },
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

      let similarUsers: any[] = [];
      if (getSimilar) {
        const whereConditions: any = {
          id: { not: id },
          city: user.city
        };

        const similar = await prisma.user.findMany({
          where: whereConditions,
          take: 3,
          orderBy: {
            createdAt: 'desc'
          }
        });

        if (userId && similar.length === 3) {
          const bookmarkIds = await prisma.userBookmark.findMany({
            where: {
              userId,
              targetId: { in: similar.map(u => u.id) }
            },
            select: { targetId: true }
          });
          
          const bookmarkedIds = new Set(bookmarkIds.map(b => b.targetId));
          similarUsers = similar.map(u => ({
            ...u,
            isBookmarked: bookmarkedIds.has(u.id)
          }));
        } else {
          similarUsers = similar.map(u => ({
            ...u,
            isBookmarked: false
          }));
        }
      }

      return { 
        success: true, 
        user: userWithBookmark,
        ...(getSimilar && { similarUsers })
      };
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