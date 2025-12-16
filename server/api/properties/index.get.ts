import prisma from "~~/lib/prisma";
import { session } from "../middleware/session"

export default session(defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const userId = event.context.user?.id;

    const {
      listingType,
      type,
      city,
      priceMin,
      priceMax,
      roomsMin,
      sizeMin,
      amenities,
      preferences,
      sortBy = "newest",
      page = 1,
      limit = 12,
    } = query;

    const take = Number(limit) || 12;
    const skip = (Number(page) - 1) * take;

    const where: Record<string, any> = { status: { not: "DRAFT" } };

    // Basic filters
    if (listingType) where.listingType = listingType;
    if (type) where.type = type;
    if (city) where.city = { contains: city as string, mode: "insensitive" };

    // Price range
    if (priceMin || priceMax) {
      where.price = {};
      if (priceMin) where.price.gte = Number(priceMin);
      if (priceMax) where.price.lte = Number(priceMax);
    }

    // Rooms and size
    if (roomsMin) where.rooms = { gte: Number(roomsMin) };
    if (sizeMin) where.sizeM2 = { gte: Number(sizeMin) };

    // Amenities
    const amenitiesList = Array.isArray(amenities) 
      ? amenities 
      : amenities 
        ? String(amenities).split(',') 
        : [];

    amenitiesList.forEach((amenity: string) => {
      const trimmed = amenity.trim();
      if (trimmed === "furnished") where.furnished = true;
      if (trimmed === "balcony") where.balcony = true;
      if (trimmed === "elevator") where.elevator = true;
      if (trimmed === "parking") where.parking = true;
      if (trimmed === "internet") where.internet = true;
      if (trimmed === "washingMachine") where.washingMachine = true;
    });

    // Preferences
    const preferencesList = Array.isArray(preferences)
      ? preferences
      : preferences
        ? String(preferences).split(',')
        : [];

    preferencesList.forEach((preference: string) => {
      const trimmed = preference.trim();
      if (trimmed === "petsAllowed") where.petsAllowed = true;
      if (trimmed === "smokingAllowed") where.smokingAllowed = true;
    });

    // Sorting
    const orderBy: Record<string, unknown> = (() => {
      switch (sortBy) {
        case "oldest": return { createdAt: "asc" };
        case "priceAsc": return { price: "asc" };
        case "priceDesc": return { price: "desc" };
        case "sizeAsc": return { sizeM2: "asc" };
        case "sizeDesc": return { sizeM2: "desc" };
        default: return { createdAt: "desc" };
      }
    })();

    // Fetch properties with pagination
    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        orderBy,
        skip,
        take,
        select: {
          id: true,
          status: true,
          title: true,
          price: true,
          city: true,
          district: true,
          sizeM2: true,
          rooms: true,
          floor: true,
          images: true,
          type: true,
          listingType: true,
          mainImageIdx: true,
        }
      }),
      prisma.property.count({ where }),
    ]);

    // Fetch user bookmarks for visible properties
    let bookmarkedPropertyIds: string[] = [];
    if (userId) {
      const bookmarks = await prisma.propertyBookmark.findMany({
        where: {
          userId,
          propertyId: { in: properties.map(p => p.id) }
        },
        select: { propertyId: true }
      });
      bookmarkedPropertyIds = bookmarks.map(b => b.propertyId);
    }

    // Add isBookmarked flag
    const propertiesWithBookmark = properties.map(property => ({
      ...property,
      isBookmarked: bookmarkedPropertyIds.includes(property.id)
    }));

    // Fetch coordinates for map display
    const coords = await prisma.property.findMany({
      where: {
        latitude: { not: null },
        longitude: { not: null },
        status: "ACTIVE"
      },
      select: { id: true, latitude: true, longitude: true }
    });

    return { 
      properties: propertiesWithBookmark, 
      total, 
      page: Number(page), 
      coords 
    };

  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch properties",
    });
  }
}));
