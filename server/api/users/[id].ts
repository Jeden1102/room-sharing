import prisma from "~~/lib/prisma";
import { session } from "../middleware/session";
import type { User } from "@prisma/client";

export default session(
  defineCachedEventHandler(
    async (event) => {
      const { id } = event.context.params as { id: string };
      const userId = event.context.user?.id;
      const getSimilar = getQuery(event).getSimilar === "true";

      try {
        const user = await prisma.user.findUnique({
          where: { id },
          select: {
            id: true,
            createdAt: true,
            contactEmail: true,
            firstName: true,
            lastName: true,
            age: true,
            profileImage: true,
            bgImage: true,
            description: true,
            gender: true,
            moodboardImages: true,
            phone: true,
            smoker: true,
            pets: true,
            profileVisible: true,
            budgetMax: true,
            propertyId: true,
            city: true,
            districts: true,
            searchAmount: true,
            interests: true,
            occupations: true,
            searchPreferences: true,
            searchPropertyTypes: true,
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

        let isBookmarked = false;
        if (userId) {
          const bookmark = await prisma.userBookmark.findUnique({
            where: {
              userId_targetId: {
                userId,
                targetId: id,
              },
            },
          });
          isBookmarked = !!bookmark;
        }

        const userWithBookmark = {
          ...user,
          isBookmarked,
        };

        let similarUsers: User[] = [];
        if (getSimilar) {
          const whereConditions: any = {
            id: { not: id },
            city: user.city,
          };

          const similar = await prisma.user.findMany({
            where: whereConditions,
            take: 3,
            select: {
              id: true,
              firstName: true,
              lastName: true,
              age: true,
              city: true,
              gender: true,
              profileImage: true,
              bgImage: true,
              districts: true,
              budgetMax: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          });

          if (userId && similar.length === 3) {
            const bookmarkIds = await prisma.userBookmark.findMany({
              where: {
                userId,
                targetId: { in: similar.map((u) => u.id) },
              },
              select: { targetId: true },
            });

            const bookmarkedIds = new Set(bookmarkIds.map((b) => b.targetId));
            similarUsers = similar.map((u) => ({
              ...u,
              isBookmarked: bookmarkedIds.has(u.id),
            }));
          } else {
            similarUsers = similar.map((u) => ({
              ...u,
              isBookmarked: false,
            }));
          }
        }

        return {
          success: true,
          user: userWithBookmark,
          ...(getSimilar && { similarUsers }),
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
  ),
);
