import prisma from "~~/lib/prisma";
import { requireAuth } from "../middleware/auth";

export default requireAuth(eventHandler(async (event) => {
  const userId = event.context.user.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      _count: {
        select: {
          bookmarkedUsers: true,
          bookmarkedProperties: true
        }
      }
    }
  });

  return {
    count: (user?._count.bookmarkedUsers ?? 0) + (user?._count.bookmarkedProperties ?? 0),
  };
}));
