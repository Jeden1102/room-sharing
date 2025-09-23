import { del } from "@vercel/blob";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "../middleware/auth";

const prisma = new PrismaClient();

export default requireAuth(
  defineEventHandler(async (event) => {
    const userId = event.context.user.id;

    const { uri, entity, field, id, images } = await readBody<{
      uri: string;
      entity?: "user" | "property";
      field?: string;
      id?: string;
      images?: string[];
    }>(event);

    if (!uri || !entity || !field || !images) {
      throw createError({ statusCode: 400, statusMessage: "Missing params" });
    }

    try {
      await del(uri);

      let updated: any;

      if (entity === "user") {
        updated = await prisma.user.update({
          where: { id: userId },
          data: {
            [field]: images,
          },
        });
      }

      if (entity === "property" && id) {
        updated = await prisma.property.update({
          where: { id },
          data: {
            [field]: images,
          },
        });
      }

      return { success: true, updated };
    } catch (e) {
      console.error(e);
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to delete file",
      });
    }
  }),
);
