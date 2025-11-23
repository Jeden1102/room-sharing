import prisma from "~~/lib/prisma";
import { requireAuth } from "../middleware/auth";

export default requireAuth(eventHandler(async (event) => {
  const userId = event.context.user.id;

  const bookmarks = await prisma.userBookmark.findMany({
    where: { userId },
    include: {
      target: true,
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  
  return { 
    bookmarks: bookmarks.map(b => ({
      ...b,
      target: {
        ...b.target,
        isBookmarked: true
      }
    }))
  };
}));
