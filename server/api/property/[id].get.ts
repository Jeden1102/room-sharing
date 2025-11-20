import prisma from "~~/lib/prisma";
import { session } from "../middleware/session"

import type { PropertyWithOwner } from "@/components/property/types"

export default session(defineCachedEventHandler(
  async (event) => {
    const { id } = event.context.params as { id: string };
    const userId = event.context.user?.id;

    try {
      const property: PropertyWithOwner | null = await prisma.property.findUnique({
        where: { id: id },
        include: {
          owner: true,
          bookmarkedBy: userId ? {
            where: { id: userId },
            select: { id: true }
          } : false
        }
      });

      if (!property) {
        throw createError({
          statusCode: 404,
          statusMessage: "Property not found",
        });
      }

      const propertyWithBookmark = {
        ...property,
        isBookmarked: userId ? property.bookmarkedBy.length > 0 : false,
        bookmarkedBy: undefined
      };
      
      return { success: true, property: propertyWithBookmark };
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
    getKey: (event) => event?.context?.params?.id || '',
  },
));