export default eventHandler(async (event) => {
  const { q }: { q: string } = getQuery(event);

  if (!q) {
    throw createError({
      statusCode: 400,
      statusMessage: "Q parameter is required",
    });
  }

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;

  const params = {
    input: q,
    types: "(cities)",
    language: "pl",
    components: "country:PL",
    key: useRuntimeConfig().googleMapsApiKey,
  };

  try {
    const response = await $fetch(url, { params });
    return response;
  } catch (error) {
    console.error("Error fetching autocomplete:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error fetching autocomplete",
    });
  }
});
