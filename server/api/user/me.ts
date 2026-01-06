import prisma from "~~/lib/prisma";
import { requireAuth } from "../middleware/auth";

export default requireAuth(
  defineCachedEventHandler(
    async (event) => {
      const userId = event.context.user.id;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          profileImage: true,
          createdAt: true,
          updatedAt: true,
          age: true,
          city: true,
          gender: true,
          smoker: true,
          pets: true,
          budgetMax: true,
          moodboardImages: true,
          description: true,
          districts: true,
          searchAmount: true,
          interests: true,
          occupations: true,
          searchPreferences: true,
          searchPropertyTypes: true,
          noiseCompatibility: true,
          petsCompatibility: true,
          profileVisible: true,
          contactEmail: true,
          phone: true,
          accountType: true,
          companyName: true,
          nip: true,
          website: true,
          address: true,
          bgImage: true,
        },
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
