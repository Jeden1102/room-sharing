import prisma from "~~/lib/prisma";

export default defineEventHandler(async () => {
  const topCities = await prisma.user.groupBy({
    by: ['city'],
    where: {
      city: { 
        not: null,
      },
      profileVisible: true,
    },
    _count: {
      id: true
    },
    orderBy: {
      _count: {
        id: 'desc'
      }
    },
    take: 7
  });

  return topCities.map(c => c.city);
});