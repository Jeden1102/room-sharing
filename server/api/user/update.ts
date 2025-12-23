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
      "contactEmail",
      "accountType",
      "companyName",
      "nip",
      "website",
      "address",
    ];

    const arrayFields = [
      "interests",
      "occupations",
      "searchPreferences",
      "searchPropertyTypes",
      "noiseCompatibility",
      "petsCompatibility",
    ];

    const data: any = {};

    for (const field of directFields) {
      if (field in body) {
        data[field] = body[field];
      }
    }

    for (const field of arrayFields) {
      if (field in body) {
        if (Array.isArray(body[field])) {
          data[field] = body[field];
        }
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
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