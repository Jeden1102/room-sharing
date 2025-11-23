import prisma from "~~/lib/prisma";
import { requireAuth } from "../middleware/auth";

export default requireAuth(eventHandler(async (event) => {
  const userId = event.context.user.id;

  const [propertyCount, userCount] = await Promise.all([
    prisma.propertyBookmark.count({ where: { userId } }),
    prisma.userBookmark.count({ where: { userId } })
  ]);
  
  return { count: propertyCount + userCount };
}));
