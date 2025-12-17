import prisma from "~~/lib/prisma";
import { requireAuth } from "../middleware/auth";

export default requireAuth(
  defineEventHandler(
    async (event) => {
      const userId = event.context.user.id;

      try {
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: {
            password: true,
          }
        });
  
        return { success: true, isPasswordSet: !!user?.password };
      } catch (e: any) {
        throw createError({
          statusCode: 500,
          statusMessage: e.message,
        });
      }

    },
  ),
);
