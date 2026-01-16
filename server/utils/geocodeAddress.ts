export async function geocodeAddress(addressParts: {
  city?: string;
  district?: string;
  street?: string;
  buildingNumber?: string;
}): Promise<{ lat: number; lon: number } | null> {
  const config = useRuntimeConfig();
  const { city, district, street, buildingNumber } = addressParts;

  if (!city && !street && !buildingNumber) return null;

  const address = [city, district, street, buildingNumber]
    .filter(Boolean)
    .join(", ");
  const query = encodeURIComponent(address);
  const url = `${config.nominatimUrl}/search?q=${query}&format=json&limit=1`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.warn("Nominatim request failed:", res.statusText);
      return null;
    }

    const data = await res.json();
    if (data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
      };
    }

    console.warn("No results for:", address);
    return null;
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
}
