import prisma from "~~/lib/prisma";
import { requireAuth } from "../middleware/auth";

export default requireAuth(eventHandler(async (event) => {
  const userId = event.context.user.id;

  const properties = await prisma.propertyBookmark.findMany({
    where: { userId },
    include: {
      property: true
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
