import prisma from "~~/lib/prisma";
import { requireAuth } from "../middleware/auth";

export default requireAuth(defineEventHandler(async (event) => {
  const body = await readBody(event);
  const userId = event.context.user.id;

  try {
    const directFields = [
      "firstName",
      "lastName",
      "age",
      "description",
      "smoker",
      "phone",
      "pets",
      "budgetMax",
      "moodboardImages",
      "bgImage",
      "profileImage",
      "gender",
      "city",
      "districts",
      "profileVisible",
    ];

    const relationFields = [
      "interests",
      "occupation",
      "searchPreferences",
      "searchPropertyType",
      "noiseCompatibility",
      "petsCompatibility",
    ];

    const data: any = {};

    for (const field of directFields) {
      if (field in body) {
        data[field] = body[field];
      }
    }

    for (const field of relationFields) {
      if (field in body) {
        data[field] = {
          set: body[field].map((id: string) => ({ id })),
        };
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
      include: {
        interests: true,
        occupation: true,
        searchPreferences: true,
        searchPropertyType: true,
        noiseCompatibility: true,
        petsCompatibility: true,
      },
    });

    const cacheStorage = useStorage("cache:users:user");
    await cacheStorage.removeItem(
      `${userId}.json`.replaceAll("-", ""),
    );

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update user",
    });
  }
}));
