export default eventHandler(async (event) => {
  const { q }: { q: string } = getQuery(event);

  if (!q) {
    throw createError({
      statusCode: 400,
      statusMessage: "Brak parametru 'q'.",
    });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;

  const params = {
    input: q,
    types: "(cities)",
    language: "pl",
    components: "country:PL",
    key: apiKey,
  };

  try {
    const response = await $fetch(url, { params });
    return response;
  } catch (error) {
    console.error("❌ Błąd Google Autocomplete:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Nie udało się pobrać podpowiedzi miast z Google.",
    });
  }
});
