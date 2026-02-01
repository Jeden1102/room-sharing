import prisma from "~~/lib/prisma";
export const PROPERTY_TYPE_MAP: Record<string, string> = {
  APARTMENT: "mieszkanie",
  HOUSE: "dom",
  ROOM: "pokoj",
  STUDIO: "kawalerka",
  LOFT: "loft",
};

export const LISTING_TYPE_MAP: Record<string, string> = {
  RENT: "wynajem",
  SALE: "sprzedaz",
};

export default defineEventHandler(async () => {
  const [properties, users, activeCombos] = await Promise.all([
    prisma.property.findMany({
      where: { status: "ACTIVE" },
      select: { id: true, updatedAt: true, title: true },
    }),
    prisma.user.findMany({
      where: { profileVisible: true },
      select: { id: true, updatedAt: true, firstName: true, lastName: true },
    }),
    prisma.property.findMany({
      where: { status: "ACTIVE" },
      distinct: ["type", "listingType", "city"],
      select: { type: true, listingType: true, city: true },
    }),
  ]);

  const dynamicCategories = new Set<string>();

  activeCombos.forEach((c) => {
    if (!c.type || !c.listingType || !c.city) return;
    const type = PROPERTY_TYPE_MAP[c.type] || slugify(c.type);
    const listing = LISTING_TYPE_MAP[c.listingType] || slugify(c.listingType);
    const city = c.city;

    if (type) dynamicCategories.add(`/nieruchomosci/${type}`);
    if (type && listing)
      dynamicCategories.add(`/nieruchomosci/${type}/${listing}`);
    if (type && listing && city)
      dynamicCategories.add(`/nieruchomosci/${type}/${listing}/${city}`);

    if (city)
      dynamicCategories.add(`/nieruchomosci/wszystkie/wszystkie/${city}`);
  });

  const categoryLinks = Array.from(dynamicCategories).map((loc) => ({
    loc,
    changefreq: "daily",
    priority: 0.8,
  }));

  const propertyLinks = properties.map((p) => ({
    loc: `/oferta/${slugify(p.title)}?id=${p.id}`,
    lastmod: p.updatedAt,
    priority: 1.0,
  }));

  const userLinks = users.map((u) => ({
    loc: `/wspollokatorzy/${slugify(`${u.firstName} ${u.lastName}`)}?id=${u.id}`,
    lastmod: u.updatedAt,
    priority: 0.4,
  }));

  return [...categoryLinks, ...propertyLinks, ...userLinks];
});
