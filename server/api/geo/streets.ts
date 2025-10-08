import { put } from "@vercel/blob";

export default defineEventHandler(async (event) => {
  const { city, refresh }: { city: string; refresh: string } = getQuery(event);

  if (!city) {
    throw createError({
      statusCode: 400,
      statusMessage: "City parameter is required.",
    });
  }

  const fileName = `ulice_${city.toLowerCase().replace(/\s+/g, "_")}.json`;
  const blobPath = `streets/${fileName}`;
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
    [out:json][timeout:60];
    area["name"="${city}"]->.searchArea;
    way(area.searchArea)["highway"]["name"];
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

    const streetsRaw = response.elements
      .map((el) => ({
        id: el.id,
        name: el.tags?.name?.trim(),
      }))
      .filter((s) => s.name);

    const seen = new Set<string>();
    const streets = streetsRaw.filter((s) => {
      const key = s.name.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    const result = { streets };

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
    console.error("There was an issue downloading the data.", error);
    throw createError({
      statusCode: 500,
      statusMessage: "There was an issue downloading the data.",
    });
  }
});
