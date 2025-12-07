import prisma from "~~/lib/prisma";
import { session } from "../middleware/session";

export default session(defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const userId = event.context.user?.id;

    const {
      gender,
      city,
      nonSmoker,
      noPets,
      budgetMax,
      sortBy = "newest",
      page = 1,
    } = query;

    const take = 12;
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
        case "ageAsc": return { age: "asc" };
        case "ageDesc": return { age: "desc" };
        case "budgetAsc": return { budgetMax: "asc" };
        case "budgetDesc": return { budgetMax: "desc" };
        default: return { createdAt: "desc" };
      }
    })();

    // Fetch users
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy,
        skip,
        take,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          age: true,
          city: true,
          gender: true,
          profileImage: true,
          bgImage: true,
          districts: true,
          budgetMax: true,
        }
      }),
      prisma.user.count({ where }),
    ]);

    // Fetch bookmarks for visible users
    let bookmarkedUserIds: string[] = [];
    if (userId && users.length) {
      const bookmarks = await prisma.userBookmark.findMany({
        where: {
          userId,
          targetId: { in: users.map(u => u.id) }
        },
        select: { targetId: true }
      });
      bookmarkedUserIds = bookmarks.map(b => b.targetId);
    }

    const usersWithBookmark = users.map(user => ({
      ...user,
      isBookmarked: bookmarkedUserIds.includes(user.id)
    }));

    return { 
      users: usersWithBookmark, 
      total, 
      page: Number(page) 
    };
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch users",
    });
  }
}));
