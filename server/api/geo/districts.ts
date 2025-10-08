import { put } from "@vercel/blob";

export default defineEventHandler(async (event) => {
  const { city, refresh }: { city: string; refresh: string } = getQuery(event);

  if (!city) {
    throw createError({
      statusCode: 400,
      statusMessage: "City parameter is required.",
    });
  }

  const fileName = `${city.toLowerCase().replace(/\s+/g, "_")}.json`;
  const blobPath = `districts/${fileName}`;
  const blobUrlBase = useRuntimeConfig().blobUrl;

  if (refresh !== "true") {
    try {
      const blobUrl = `${blobUrlBase}/${blobPath}`;
      const res = await fetch(blobUrl);

      if (res.ok) {
        const json = await res.json();
        return {
          source: "cache",
          city,
          ...json,
        };
      }
    } catch (err) {
      console.warn(`No cache for ${city}:`, err);
    }
  }

  const query = `
    [out:json][timeout:25];
    area["name"="${city}"]->.city;
    relation(area.city)["admin_level"="9"]["boundary"="administrative"];
    out tags;
  `;

  try {
    const response: { elements: any[] } = await $fetch(
      "https://overpass-api.de/api/interpreter",
      {
        method: "POST",
        body: query,
      },
    );

    const districtsRaw = response.elements.map((el) => ({
      id: el.id,
      name: el.tags?.name ?? null,
    }));

    const seen = new Set();
    const districts = districtsRaw.filter((d) => {
      const key = d.name?.toLowerCase() || d.id;
      if (seen.has(key) || !d.name) return false;
      seen.add(key);
      return true;
    });

    const result = { districts };

    const blob = await put(blobPath, JSON.stringify(result, null, 2), {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/json",
    });

    return {
      source: "api",
      city,
      ...result,
    };
  } catch (error) {
    console.error("Issue with Overpass API:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "There was an issue downloading the data.",
    });
  }
});
