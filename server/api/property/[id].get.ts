import prisma from "~~/lib/prisma";
import { session } from "../middleware/session"

import type { PropertyWithOwner } from "@/components/property/types"

export default session(defineCachedEventHandler(
  async (event) => {
    const { id } = event.context.params as { id: string };
    const userId = event.context.user?.id;

    try {
      const property: PropertyWithOwner | null = await prisma.property.findUnique({
        where: { id },
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

      let isBookmarked = false;
      if (userId) {
        const bookmark = await prisma.propertyBookmark.findUnique({
          where: {
            userId_propertyId: {
              userId,
              propertyId: id
            }
          }
        });
        isBookmarked = !!bookmark;
      }

      const propertyWithBookmark = {
        ...property,
        isBookmarked
      };
      
      return { success: true, property: propertyWithBookmark };
    } catch (error) {
      console.error(error);
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
