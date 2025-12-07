import prisma from "~~/lib/prisma";
import { requireAuth } from "../middleware/auth";

export default requireAuth(eventHandler(async (event) => {
  const userId = event.context.user.id;

  const properties = await prisma.propertyBookmark.findMany({
    where: { userId, property: { status: { not: 'DRAFT' } } },
    include: {
      property: {
        select:{
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
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return { 
    properties: properties.map(b => ({
      ...b,
      property: {
        ...b.property,
        isBookmarked: true
      }
    }))
  };
}));
