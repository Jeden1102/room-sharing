import { del } from "@vercel/blob";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "#auth";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session?.user) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  const { uri, entity, field, id, images } = await readBody<{
    uri: string; // plik do usunięcia w blob
    entity: "user" | "property";
    field: string;
    id?: string;
    images: string[]; // nowa lista obrazków
  }>(event);

  if (!uri || !entity || !field || !images) {
    throw createError({ statusCode: 400, statusMessage: "Missing params" });
  }

  try {
    // 1. Usuń plik z Vercel Blob
    await del(uri);

    // 2. Update w DB na podstawie podanej listy
    let updated: any;

    if (entity === "user") {
      updated = await prisma.user.update({
        where: { id: session.user.id },
        data: {
          [field]: images, // tablica lub pusty array
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
});
