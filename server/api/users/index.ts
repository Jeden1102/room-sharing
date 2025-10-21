import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);

    const {
      gender,
      city,
      nonSmoker,
      noPets,
      budgetMax,
      sortBy = "newest",
      page = 1,
    } = query;

    const take = 10;
    const skip = (Number(page) - 1) * take;

    const where: any = {
      profileVisible: true,
    };

    if (gender) where.gender = gender;
    if (city) where.city = { contains: city as string, mode: "insensitive" };
    if (nonSmoker === "true") where.smoker = false;
    if (noPets === "true") where.pets = false;
    if (budgetMax) where.budgetMax = { gte: Number(budgetMax) };

    // Sorting
    const orderBy: any = (() => {
      switch (sortBy) {
        case "ageAsc":
          return { age: "asc" };
        case "ageDesc":
          return { age: "desc" };
        case "budgetAsc":
          return { budgetMax: "asc" };
        case "budgetDesc":
          return { budgetMax: "desc" };
        default:
          return { createdAt: "desc" };
      }
    })();

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
      prisma.user.count({ where }),
    ]);

    return { users, total, page: Number(page) };
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch users",
    });
  }
});
