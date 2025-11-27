import prisma from "~~/lib/prisma";
import { requireAuth } from "../middleware/auth";

export default requireAuth(
  defineEventHandler(async (event) => {
    const userId = event.context.user.id;
    const { id } = event.context.params as { id: string };

    try {
      const property = await prisma.property.findUnique({
        where: { id, ownerId: userId },
        select: { id: true, ownerId: true },
      });

      if (!property) {
        throw createError({ 
          statusCode: 404, 
          statusMessage: "api.property.notFound" 
        });
      }

      await prisma.property.delete({
        where: { id },
      });

      return { 
        success: true, 
        message: "api.property.deleteSuccess" 
      };
    } catch (error) {
      console.error("Property delete error:", error);
      throw createError({
        statusCode: 500,
        statusMessage: "api.property.deleteFailed",
      });
    }
  })
);