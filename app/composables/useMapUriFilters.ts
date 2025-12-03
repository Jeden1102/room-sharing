export function useMapUriFilters() {
  const { listingTypeOptions, propertyTypeOptions } = useTaxonomies();

  const getMappedKey = (taxonomy: string, label: string | null) => {
    if (!label) {
      return null;
    }
    if (taxonomy === "listingType") {
      return listingTypeOptions.find(
        (option) => slugify(option.label) === slugify(label),
      )?.value;
    } else if (taxonomy === "propertyType") {
      return propertyTypeOptions.find(
        (option) => slugify(option.label) === slugify(label),
      )?.value;
    }
  };

  return {
    getMappedKey,
  };
}
