import { PrismaClient } from "@prisma/client";
import { getServerSession } from "#auth";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = await getServerSession(event);

  if (!session || !session.user) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  try {
    console.log(body);
    const updatedUser = await prisma.user.update({
      where: { id: session.user?.id },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        age: body.age,
        description: body.description,
        smoker: body.smoker,
        phone: body.phone,
        pets: body.pets,
        budgetMax: body.budgetMax,
        moodboardImages: body.moodboardImages,
        gender: body.gender,
        interests: body.interests?.length
          ? {
              set: body.interests.map((id: string) => ({ id })),
            }
          : { set: [] },
        occupation: body.occupation?.length
          ? {
              set: body.occupation.map((id: string) => ({ id })),
            }
          : { set: [] },
        searchPreferences: body.searchPreferences?.length
          ? {
              set: body.searchPreferences.map((id: string) => ({ id })),
            }
          : { set: [] },
        searchPropertyType: body.searchPropertyType?.length
          ? {
              set: body.searchPropertyType.map((id: string) => ({ id })),
            }
          : { set: [] },
        noiseCompatibility: body.noiseCompatibility?.length
          ? {
              set: body.noiseCompatibility.map((id: string) => ({ id })),
            }
          : { set: [] },
        petsCompatibility: body.petsCompatibility?.length
          ? {
              set: body.petsCompatibility.map((id: string) => ({ id })),
            }
          : { set: [] },
      },
      include: {
        interests: true,
        occupation: true,
        searchPreferences: true,
        searchPropertyType: true,
        petsCompatibility: true,
      },
    });

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update user",
    });
  }
});
