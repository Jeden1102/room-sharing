export const useTaxonomies = () => {
  const { t } = useI18n();

  const listingTypeOptions = [
    { label: t('taxonomies.listingType.any'), value: null },
    { label: t('taxonomies.listingType.rent'), value: "RENT" },
    { label: t('taxonomies.listingType.sale'), value: "SALE" },
  ]

  const propertyTypeOptions = [
    { label: t('taxonomies.propertyType.any'), value: null },
    { label: t('taxonomies.propertyType.apartment'), value: "APARTMENT" },
    { label: t('taxonomies.propertyType.house'), value: "HOUSE" },
    { label: t('taxonomies.propertyType.room'), value: "ROOM" },
    { label: t('taxonomies.propertyType.studio'), value: "STUDIO" },
  ]

  const amenitiesOptions = [
    { label: t('taxonomies.amenities.furnished'), value: "furnished" },
    { label: t('taxonomies.amenities.balcony'), value: "balcony" },
    { label: t('taxonomies.amenities.elevator'), value: "elevator" },
    { label: t('taxonomies.amenities.parking'), value: "parking" },
    { label: t('taxonomies.amenities.washingMachine'), value: "washingMachine" },
    { label: t('taxonomies.amenities.dishwasher'), value: "dishwasher" },
    { label: t('taxonomies.amenities.airConditioning'), value: "airConditioning" },
    { label: t('taxonomies.amenities.petsAllowed'), value: "petsAllowed" },
    { label: t('taxonomies.amenities.smokingAllowed'), value: "smokingAllowed" },
  ]

  const mediasOptions = [
    { label: t('taxonomies.media.internet'), value: "internet" },
    { label: t('taxonomies.media.tv'), value: "tv" },
  ]

  const contactReasonOptions = [
    { label: t('taxonomies.contactReason.bug'), value: "bug" },
    { label: t('taxonomies.contactReason.technical'), value: "technical" },
    { label: t('taxonomies.contactReason.listing'), value: "listing" },
    { label: t('taxonomies.contactReason.reportListing'), value: "reportListing" },
    { label: t('taxonomies.contactReason.reportUser'), value: "reportUser" },
    { label: t('taxonomies.contactReason.account'), value: "account" },
    { label: t('taxonomies.contactReason.payment'), value: "payment" },
    { label: t('taxonomies.contactReason.partnership'), value: "partnership" },
    { label: t('taxonomies.contactReason.suggestion'), value: "suggestion" },
    { label: t('taxonomies.contactReason.search'), value: "search" },
    { label: t('taxonomies.contactReason.login'), value: "login" },
    { label: t('taxonomies.contactReason.terms'), value: "terms" },
    { label: t('taxonomies.contactReason.privacy'), value: "privacy" },
    { label: t('taxonomies.contactReason.spam'), value: "spam" },
    { label: t('taxonomies.contactReason.verification'), value: "verification" },
    { label: t('taxonomies.contactReason.premium'), value: "premium" },
    { label: t('taxonomies.contactReason.deleteAccount'), value: "deleteAccount" },
    { label: t('taxonomies.contactReason.other'), value: "other" },
  ]

  const genderOptions = [
    { name: t('taxonomies.gender.any'), id: null },
    { name: t('taxonomies.gender.male'), id: "male" },
    { name: t('taxonomies.gender.female'), id: "female" },
    { name: t('taxonomies.gender.others'), id: "others" },
  ]

  const propertiesSortOptions = [
    { label: t('taxonomies.propertiesSort.newest'), value: "newest" },
    { label: t('taxonomies.propertiesSort.oldest'), value: "oldest" },
    { label: t('taxonomies.propertiesSort.priceAsc'), value: "priceAsc" },
    { label: t('taxonomies.propertiesSort.priceDesc'), value: "priceDesc" },
    { label: t('taxonomies.propertiesSort.sizeAsc'), value: "sizeAsc" },
    { label: t('taxonomies.propertiesSort.sizeDesc'), value: "sizeDesc" },
  ]

  const usersSortOptions = [
    { label: t('taxonomies.usersSort.none'), value: null },
    { label: t('taxonomies.usersSort.newest'), value: "newest" },
    { label: t('taxonomies.usersSort.ageAsc'), value: "ageAsc" },
    { label: t('taxonomies.usersSort.ageDesc'), value: "ageDesc" },
    { label: t('taxonomies.usersSort.budgetAsc'), value: "budgetAsc" },
    { label: t('taxonomies.usersSort.budgetDesc'), value: "budgetDesc" },
  ]

  const interestsOptions = [
    { name: t('taxonomies.interests.sports'), id: "sports" },
    { name: t('taxonomies.interests.music'), id: "music" },
    { name: t('taxonomies.interests.travel'), id: "travel" },
    { name: t('taxonomies.interests.cooking'), id: "cooking" },
    { name: t('taxonomies.interests.reading'), id: "reading" },
    { name: t('taxonomies.interests.gaming'), id: "gaming" },
    { name: t('taxonomies.interests.movies'), id: "movies" },
    { name: t('taxonomies.interests.art'), id: "art" },
    { name: t('taxonomies.interests.photography'), id: "photography" },
    { name: t('taxonomies.interests.fitness'), id: "fitness" },
    { name: t('taxonomies.interests.dance'), id: "dance" },
    { name: t('taxonomies.interests.yoga'), id: "yoga" },
    { name: t('taxonomies.interests.hiking'), id: "hiking" },
    { name: t('taxonomies.interests.cycling'), id: "cycling" },
    { name: t('taxonomies.interests.technology'), id: "technology" },
  ]

  const occupationsOptions = [
    { name: t('taxonomies.occupations.student'), id: "student" },
    { name: t('taxonomies.occupations.remoteWorker'), id: "remote_worker" },
    { name: t('taxonomies.occupations.worker'), id: "worker" },
    { name: t('taxonomies.occupations.unemployed'), id: "unemployed" },
  ]

  const searchPreferencesOptions = [
    { name: t('taxonomies.searchPreferences.quiet'), id: "quiet" },
    { name: t('taxonomies.searchPreferences.nonSmoker'), id: "non-smoker" },
    { name: t('taxonomies.searchPreferences.central'), id: "central" },
    { name: t('taxonomies.searchPreferences.green'), id: "green" },
    { name: t('taxonomies.searchPreferences.transport'), id: "transport" },
    { name: t('taxonomies.searchPreferences.university'), id: "university" },
    { name: t('taxonomies.searchPreferences.work'), id: "work" },
    { name: t('taxonomies.searchPreferences.shops'), id: "shops" },
    { name: t('taxonomies.searchPreferences.restaurants'), id: "restaurants" },
    { name: t('taxonomies.searchPreferences.gym'), id: "gym" },
    { name: t('taxonomies.searchPreferences.safe'), id: "safe" },
  ]

  const searchPropertyTypesOptions = [
    { name: t('taxonomies.searchPropertyTypes.apartment'), id: "apartment" },
    { name: t('taxonomies.searchPropertyTypes.house'), id: "house" },
    { name: t('taxonomies.searchPropertyTypes.studio'), id: "studio" },
    { name: t('taxonomies.searchPropertyTypes.room'), id: "room" },
    { name: t('taxonomies.searchPropertyTypes.loft'), id: "loft" },
  ]

  const noiseCompatibilityOptions = [
    { name: t('taxonomies.noiseCompatibility.veryQuiet'), id: "very_quiet" },
    { name: t('taxonomies.noiseCompatibility.quiet'), id: "quiet" },
    { name: t('taxonomies.noiseCompatibility.moderate'), id: "moderate" },
    { name: t('taxonomies.noiseCompatibility.loud'), id: "loud" },
    { name: t('taxonomies.noiseCompatibility.veryLoud'), id: "very_loud" },
  ]

  const petsCompatibilityOptions = [
    { name: t('taxonomies.petsCompatibility.noPets'), id: "no_pets" },
    { name: t('taxonomies.petsCompatibility.cats'), id: "cats" },
    { name: t('taxonomies.petsCompatibility.dogs'), id: "dogs" },
    { name: t('taxonomies.petsCompatibility.smallPets'), id: "small_pets" },
    { name: t('taxonomies.petsCompatibility.allPets'), id: "all_pets" },
  ]

  const statusOptions = [
    { label: t('taxonomies.status.draft'), value: "DRAFT" },
    { label: t('taxonomies.status.active'), value: "ACTIVE" },
    { label: t('taxonomies.status.reserved'), value: "RESERVED" },
  ]

  const reportOptions = [
    { label: t("entityReport.reportReasons.SPAM"), value: "SPAM" },
    { label: t("entityReport.reportReasons.SCAM"), value: "SCAM" },
    { label: t("entityReport.reportReasons.INAPPROPRIATE_BEHAVIOR"), value: "INAPPROPRIATE_BEHAVIOR" },
    { label: t("entityReport.reportReasons.FAKE_PROFILE"), value: "FAKE_PROFILE" },
    { label: t("entityReport.reportReasons.MISLEADING_INFORMATION"), value: "MISLEADING_INFORMATION" },
    { label: t("entityReport.reportReasons.OTHER"), value: "OTHER" }
  ];

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
    reportOptions
  };
};