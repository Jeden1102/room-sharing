export default defineCachedEventHandler(
  async (event) => {
    const [
      interests,
      occupations,
      searchPreferences,
      propertyTypes,
      noiseCompatibility,
      petsCompatibility,
    ] = await Promise.all([
      $fetch("/api/taxonomy_term/interest"),
      $fetch("/api/taxonomy_term/occupation"),
      $fetch("/api/taxonomy_term/searchPreference"),
      $fetch("/api/taxonomy_term/propertyOption"),
      $fetch("/api/taxonomy_term/noiseCompatibility"),
      $fetch("/api/taxonomy_term/PetsCompatibility"),
    ]);

    return {
      interests,
      occupations,
      searchPreferences,
      propertyTypes,
      noiseCompatibility,
      petsCompatibility,
    };
  },
  { maxAge: 60 * 60 },
);
