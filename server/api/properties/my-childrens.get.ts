import prisma from "~~/lib/prisma";
import { requireAuth } from "../middleware/auth";

export default requireAuth(
  defineEventHandler(async (event) => {
    const userId = event.context.user.id;

    const properties = await prisma.property.findMany({
      where: {
        ownerId: userId,
        type: "ROOM",
      },
      select: {
        id: true,
        title: true,
        type: true,
      },
    });

    return { properties };
  }),
);
