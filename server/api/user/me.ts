import prisma from "~~/lib/prisma";
import { requireAuth } from "../middleware/auth";

export default requireAuth(
  defineCachedEventHandler(
    async (event) => {
      const userId = event.context.user.id;

      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      return { success: true, user };
    },
    {
      maxAge: 60 * 60,
      group: "users",
      name: "user",
      getKey: (event) => event.context.user.id,
    },
  ),
);
