import prisma from "~~/lib/prisma";

export default defineEventHandler(async () => {
  const [properties, users] = await Promise.all([
    prisma.property.findMany({
      where: { status: { not: 'DRAFT' } },
      select: { id: true, updatedAt: true, type: true, title: true }
    }),
    prisma.user.findMany({
      where: { profileVisible: true },
      select: { id: true, updatedAt: true, firstName: true, lastName: true }
    })
  ]);

  const propertyLinks = properties.map(p => ({
    loc: `/oferta/${slugify(p.title)}?id=${p.id}`,
    lastmod: p.updatedAt,
    changefreq: 'daily',
    priority: 0.9
  }));

  const categoryLinks = [
    { loc: '/oferty/mieszkanie', changefreq: 'weekly', priority: 0.8 },
    { loc: '/oferty/dom', changefreq: 'weekly', priority: 0.8 },
    { loc: '/oferty/pokoj', changefreq: 'weekly', priority: 0.8 },
  ];

  const userLinks = users.map(u => ({
    loc: `/uzytkownicy/${u.firstName?.toLowerCase()}-${u.lastName?.toLowerCase()}?id=${u.id}`, 
    lastmod: u.updatedAt,
    changefreq: 'weekly',
    priority: 0.5
  }));

  return [
    ...categoryLinks,
    ...propertyLinks,
    ...userLinks
  ];
});