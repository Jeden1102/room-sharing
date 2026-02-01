import { useI18n } from "vue-i18n";
import { medias, amenityValues } from "~/constants/taxonomies";

export const useTaxonomies = () => {
  const { t } = useI18n();

  const listingTypeOptions = [
    { label: t("taxonomies.listingType.any"), value: null },
    { label: t("taxonomies.listingType.rent"), value: "RENT" },
    { label: t("taxonomies.listingType.sale"), value: "SALE" },
  ];

  const propertyTypeOptions = [
    { label: t("taxonomies.propertyType.any"), value: null },
    { label: t("taxonomies.propertyType.apartment"), value: "APARTMENT" },
    { label: t("taxonomies.propertyType.house"), value: "HOUSE" },
    { label: t("taxonomies.propertyType.room"), value: "ROOM" },
    { label: t("taxonomies.propertyType.studio"), value: "STUDIO" },
    { label: t("taxonomies.propertyType.loft"), value: "LOFT" },
  ];

  const amenitiesOptions = () => {
    return amenityValues.map((amenity) => {
      return {
        label: t(`taxonomies.amenities.${amenity}`),
        value: amenity,
      };
    });
  };

  const mediasOptions = () => {
    return medias.map((media) => {
      return {
        label: t(`taxonomies.media.${media}`),
        value: media,
      };
    });
  };

  const contactReasonOptions = [
    { label: t("taxonomies.contactReason.bug"), value: "bug" },
    { label: t("taxonomies.contactReason.technical"), value: "technical" },
    { label: t("taxonomies.contactReason.listing"), value: "listing" },
    {
      label: t("taxonomies.contactReason.reportListing"),
      value: "reportListing",
    },
    { label: t("taxonomies.contactReason.reportUser"), value: "reportUser" },
    { label: t("taxonomies.contactReason.account"), value: "account" },
    { label: t("taxonomies.contactReason.payment"), value: "payment" },
    { label: t("taxonomies.contactReason.partnership"), value: "partnership" },
    { label: t("taxonomies.contactReason.suggestion"), value: "suggestion" },
    { label: t("taxonomies.contactReason.search"), value: "search" },
    { label: t("taxonomies.contactReason.login"), value: "login" },
    { label: t("taxonomies.contactReason.terms"), value: "terms" },
    { label: t("taxonomies.contactReason.privacy"), value: "privacy" },
    { label: t("taxonomies.contactReason.spam"), value: "spam" },
    {
      label: t("taxonomies.contactReason.verification"),
      value: "verification",
    },
    { label: t("taxonomies.contactReason.premium"), value: "premium" },
    {
      label: t("taxonomies.contactReason.deleteAccount"),
      value: "deleteAccount",
    },
    { label: t("taxonomies.contactReason.other"), value: "other" },
  ];

  const genderOptions = [
    { label: t("taxonomies.gender.any"), value: null },
    { label: t("taxonomies.gender.male"), value: "male" },
    { label: t("taxonomies.gender.female"), value: "female" },
    { label: t("taxonomies.gender.others"), value: "others" },
  ];

  const propertiesSortOptions = [
    { label: t("taxonomies.propertiesSort.newest"), value: "newest" },
    { label: t("taxonomies.propertiesSort.oldest"), value: "oldest" },
    { label: t("taxonomies.propertiesSort.priceAsc"), value: "priceAsc" },
    { label: t("taxonomies.propertiesSort.priceDesc"), value: "priceDesc" },
    { label: t("taxonomies.propertiesSort.sizeAsc"), value: "sizeAsc" },
    { label: t("taxonomies.propertiesSort.sizeDesc"), value: "sizeDesc" },
  ];

  const usersSortOptions = [
    { label: t("taxonomies.usersSort.none"), value: null },
    { label: t("taxonomies.usersSort.newest"), value: "newest" },
    { label: t("taxonomies.usersSort.ageAsc"), value: "ageAsc" },
    { label: t("taxonomies.usersSort.ageDesc"), value: "ageDesc" },
    { label: t("taxonomies.usersSort.budgetAsc"), value: "budgetAsc" },
    { label: t("taxonomies.usersSort.budgetDesc"), value: "budgetDesc" },
  ];

  const interestsOptions = [
    { label: t("taxonomies.interests.sports"), value: "sports" },
    { label: t("taxonomies.interests.music"), value: "music" },
    { label: t("taxonomies.interests.travel"), value: "travel" },
    { label: t("taxonomies.interests.cooking"), value: "cooking" },
    { label: t("taxonomies.interests.reading"), value: "reading" },
    { label: t("taxonomies.interests.gaming"), value: "gaming" },
    { label: t("taxonomies.interests.movies"), value: "movies" },
    { label: t("taxonomies.interests.art"), value: "art" },
    { label: t("taxonomies.interests.photography"), value: "photography" },
    { label: t("taxonomies.interests.fitness"), value: "fitness" },
    { label: t("taxonomies.interests.dance"), value: "dance" },
    { label: t("taxonomies.interests.yoga"), value: "yoga" },
    { label: t("taxonomies.interests.hiking"), value: "hiking" },
    { label: t("taxonomies.interests.cycling"), value: "cycling" },
    { label: t("taxonomies.interests.technology"), value: "technology" },
  ];

  const occupationsOptions = [
    { label: t("taxonomies.occupations.student"), value: "student" },
    { label: t("taxonomies.occupations.remoteWorker"), value: "remote_worker" },
    { label: t("taxonomies.occupations.worker"), value: "worker" },
    { label: t("taxonomies.occupations.unemployed"), value: "unemployed" },
  ];

  const searchPreferencesOptions = [
    { label: t("taxonomies.searchPreferences.quiet"), value: "quiet" },
    { label: t("taxonomies.searchPreferences.nonSmoker"), value: "non-smoker" },
    { label: t("taxonomies.searchPreferences.central"), value: "central" },
    { label: t("taxonomies.searchPreferences.green"), value: "green" },
    { label: t("taxonomies.searchPreferences.transport"), value: "transport" },
    {
      label: t("taxonomies.searchPreferences.university"),
      value: "university",
    },
    { label: t("taxonomies.searchPreferences.work"), value: "work" },
    { label: t("taxonomies.searchPreferences.shops"), value: "shops" },
    {
      label: t("taxonomies.searchPreferences.restaurants"),
      value: "restaurants",
    },
    { label: t("taxonomies.searchPreferences.gym"), value: "gym" },
    { label: t("taxonomies.searchPreferences.safe"), value: "safe" },
  ];

  const searchPropertyTypesOptions = [
    {
      label: t("taxonomies.searchPropertyTypes.apartment"),
      value: "apartment",
    },
    { label: t("taxonomies.searchPropertyTypes.house"), value: "house" },
    { label: t("taxonomies.searchPropertyTypes.studio"), value: "studio" },
    { label: t("taxonomies.searchPropertyTypes.room"), value: "room" },
    { label: t("taxonomies.searchPropertyTypes.loft"), value: "loft" },
  ];

  const noiseCompatibilityOptions = [
    {
      label: t("taxonomies.noiseCompatibility.veryQuiet"),
      value: "very_quiet",
    },
    { label: t("taxonomies.noiseCompatibility.quiet"), value: "quiet" },
    { label: t("taxonomies.noiseCompatibility.moderate"), value: "moderate" },
    { label: t("taxonomies.noiseCompatibility.loud"), value: "loud" },
    { label: t("taxonomies.noiseCompatibility.veryLoud"), value: "very_loud" },
  ];

  const petsCompatibilityOptions = [
    { label: t("taxonomies.petsCompatibility.noPets"), value: "no_pets" },
    { label: t("taxonomies.petsCompatibility.cats"), value: "cats" },
    { label: t("taxonomies.petsCompatibility.dogs"), value: "dogs" },
    { label: t("taxonomies.petsCompatibility.smallPets"), value: "small_pets" },
    { label: t("taxonomies.petsCompatibility.allPets"), value: "all_pets" },
  ];

  const statusOptions = [
    { label: t("taxonomies.status.draft"), value: "DRAFT" },
    { label: t("taxonomies.status.active"), value: "ACTIVE" },
    { label: t("taxonomies.status.reserved"), value: "RESERVED" },
  ];

  const reportOptions = [
    { label: t("entityReport.reportReasons.SPAM"), value: "SPAM" },
    { label: t("entityReport.reportReasons.SCAM"), value: "SCAM" },
    {
      label: t("entityReport.reportReasons.INAPPROPRIATE_BEHAVIOR"),
      value: "INAPPROPRIATE_BEHAVIOR",
    },
    {
      label: t("entityReport.reportReasons.FAKE_PROFILE"),
      value: "FAKE_PROFILE",
    },
    {
      label: t("entityReport.reportReasons.MISLEADING_INFORMATION"),
      value: "MISLEADING_INFORMATION",
    },
    { label: t("entityReport.reportReasons.OTHER"), value: "OTHER" },
  ];

  const allTaxonomies = {
    listingTypeOptions,
    propertyTypeOptions,
    amenitiesOptions,
    mediasOptions,
    contactReasonOptions,
    genderOptions,
    propertiesSortOptions,
    usersSortOptions,
    interestsOptions,
    occupationsOptions,
    searchPreferencesOptions,
    searchPropertyTypesOptions,
    noiseCompatibilityOptions,
    petsCompatibilityOptions,
    statusOptions,
    reportOptions,
  };

  const mapTaxonomyLabel = (
    taxonomyKey: keyof typeof allTaxonomies,
    value: string | null,
  ): string => {
    const optionsArray = allTaxonomies[taxonomyKey];

    if (!optionsArray) {
      return "";
    }

    const foundOption: any = optionsArray.find(
      (option: any) => option.value === value,
    );

    return foundOption ? foundOption.label : "";
  };

  return {
    listingTypeOptions,
    propertyTypeOptions,
    amenitiesOptions,
    mediasOptions,
    contactReasonOptions,
    genderOptions,
    propertiesSortOptions,
    usersSortOptions,
    interestsOptions,
    occupationsOptions,
    searchPreferencesOptions,
    searchPropertyTypesOptions,
    noiseCompatibilityOptions,
    petsCompatibilityOptions,
    statusOptions,
    reportOptions,
    mapTaxonomyLabel,
  };
};
