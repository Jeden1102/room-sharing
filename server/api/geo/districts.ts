import { promises as fs } from "fs";
import path from "path";

export default eventHandler(async (event) => {
  const { city, refresh }: { city: string; refresh: string } = getQuery(event);

  const fileName = `${city.toLowerCase().replace(/\s+/g, "_")}.json`;
  const filePath = path.resolve("./data", fileName);

  if (refresh !== "true") {
    try {
      const cached = await fs.readFile(filePath, "utf8");
      const json = JSON.parse(cached);
      return {
        source: "cache",
        city,
        ...json,
      };
    } catch (e) {}
  }

  const query = `
    [out:json][timeout:25];
    area["name"="${city}"]->.city;
    relation(area.city)["admin_level"="9"]["boundary"="administrative"];
    out tags;
  `;

  try {
    const response: { elements: object[] } = await $fetch(
      "https://overpass-api.de/api/interpreter",
      {
        method: "POST",
        body: query,
      },
    );

    const districts = response.elements;

    const result = { districts };

    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(result, null, 2), "utf8");

    return {
      source: "api",
      city,
      ...result,
    };
  } catch (error) {
    console.error("❌ Błąd pobierania z Overpass API:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Nie udało się pobrać danych o dzielnicach.",
    });
  }
});
