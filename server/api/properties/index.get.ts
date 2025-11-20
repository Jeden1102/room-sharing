import prisma from "~~/lib/prisma";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const session = await getServerSession(event);

    const userId = session?.user?.id

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
      limit = 10,
    } = query;
    
    const take = Number(limit) || 10;
    const skip = (Number(page) - 1) * take;

    const where: any = {
      status: "ACTIVE",
    };

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

    // Amenities - parse from comma-separated string or array
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

    // Preferences - parse from comma-separated string or array
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
    const orderBy: any = (() => {
      switch (sortBy) {
        case "oldest":
          return { createdAt: "asc" };
        case "priceAsc":
          return { price: "asc" };
        case "priceDesc":
          return { price: "desc" };
        case "sizeAsc":
          return { sizeM2: "asc" };
        case "sizeDesc":
          return { sizeM2: "desc" };
        default:
          return { createdAt: "desc" };
      }
    })();

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          bookmarkedBy: userId ? {
            where: { id: userId },
            select: { id: true }
          } : false
        }
      }),
      prisma.property.count({ where }),
    ]);

    const propertiesWithBookmark = properties.map(property => ({
      ...property,
      isBookmarked: userId ? property.bookmarkedBy.length > 0 : false,
      bookmarkedBy: undefined
    }));

    delete where.city;

    where.latitude = { not: null };
    where.longitude = { not: null };

    const coords = await prisma.property.findMany({
      where,
      select: {
        id: true,
        latitude: true,
        longitude: true
      }
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
});