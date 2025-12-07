import prisma from "~~/lib/prisma";
import { session } from "../middleware/session"
import type { PropertyWithOwner } from "@/components/property/types"

export default session(defineCachedEventHandler(
  async (event) => {
    const { id } = event.context.params as { id: string };
    const userId = event.context.user?.id;
    const getSimilar = getQuery(event).getSimilar === 'true';

    try {
      const property: PropertyWithOwner | null = await prisma.property.findUnique({
        where: { id },
        include: {
          owner: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profileImage: true
            }
          }
        }
      });
      

      if (!property) {
         throw createError({ statusCode: 404, statusMessage: "Property not found" });
      }

      const isOwner = userId && property.ownerId === userId;
      
      if (property.status === 'DRAFT' && !isOwner) {
        throw createError({
          statusCode: 403,
          statusMessage: "Forbidden: You do not have permission to view this property.",
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

      let similarProperties: any[] = [];
      if (getSimilar && property.city) {
        const similar = await prisma.property.findMany({
          where: {
            city: property.city,
            id: { not: id },
            status: {not: 'DRAFT'}
          },
          select: {
            id: true,
            status: true,
            title: true,
            price: true,
            city: true,
            district: true,
            sizeM2: true,
            rooms: true,
            floor: true,
            images: true,
            type: true,
            listingType: true,
            mainImageIdx: true,
          },
          take: 3,
          orderBy: {
            createdAt: 'desc'
          }
        });

        if (userId) {
          const bookmarkIds = await prisma.propertyBookmark.findMany({
            where: {
              userId,
              propertyId: { in: similar.map(p => p.id) }
            },
            select: { propertyId: true }
          });
          
          const bookmarkedIds = new Set(bookmarkIds.map(b => b.propertyId));
          similarProperties = similar.map(p => ({
            ...p,
            isBookmarked: bookmarkedIds.has(p.id)
          }));
        } else {
          similarProperties = similar.map(p => ({
            ...p,
            isBookmarked: false
          }));
        }
      }

      return { 
        success: true, 
        property: propertyWithBookmark,
        ...(getSimilar && { similarProperties })
      };
    } catch (error: any) {
      if (error.statusCode === 403 || error.statusCode === 404) {
          throw error;
      }
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
    shouldBypassCache: async (event) => {
      const id = event.context.params?.id;
      if (!id) return true;
      
      try {
        const property = await prisma.property.findUnique({
          where: { id },
          select: { status: true } 
        });
        return property?.status === 'DRAFT'; 
      } catch (e) {
        return true; 
      }
    }
  },
));