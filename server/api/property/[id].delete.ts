import prisma from "~~/lib/prisma";
import { requireAuth } from "../middleware/auth";
import { del } from "@vercel/blob";

export default requireAuth(
  defineEventHandler(async (event) => {
    const userId = event.context.user.id;
    const { id } = event.context.params as { id: string };

    try {
      const property = await prisma.property.findUnique({
        where: { id, ownerId: userId },
        select: { id: true, ownerId: true, images: true },
      });

      if (!property) {
        throw createError({
          statusCode: 404,
          statusMessage: "api.property.notFound",
        });
      }

      property.images.forEach((uri) => {
        if (uri) {
          del(uri);
        }
      });

      await prisma.property.delete({
        where: { id },
      });

      const cacheStorage = useStorage("cache:properties:property");
      await cacheStorage.removeItem(`${id}.json`.replaceAll("-", ""));

      return {
        success: true,
        message: "api.property.deleteSuccess",
      };
    } catch (error) {
      console.error("Property delete error:", error);
      throw createError({
        statusCode: 500,
        statusMessage: "api.property.deleteFailed",
      });
    }
  }),
);
