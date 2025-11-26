export const useTaxonomies = () => {
  const listingTypeOptions = [
    { label: "Dowolny", value: null },
    { label: "Wynajem", value: "RENT" },
    { label: "Sprzedaż", value: "SALE" },
  ];

  const propertyTypeOptions = [
    { label: "Dowolny", value: null },
    { label: "Mieszkanie", value: "APARTMENT" },
    { label: "Dom", value: "HOUSE" },
    { label: "Pokój", value: "ROOM" },
    { label: "Studio", value: "STUDIO" },
  ];

  const amenitiesOptions = [
    { label: "Umeblowane", value: "furnished" },
    { label: "Balkon", value: "balcony" },
    { label: "Winda", value: "elevator" },
    { label: "Parking", value: "parking" },
    { label: "Pralka", value: "washingMachine" },
    { label: "Zmywarka", value: "dishwasher" },
    { label: "Klimatyzacja", value: "airConditioning" },
    { label: "Zwierzęta dozwolone", value: "petsAllowed" },
    { label: "Palenie dozwolone", value: "smokingAllowed" },
  ];

  const mediasOptions = [
    { label: "Internet", value: "internet" },
    { label: "Telewizja", value: "tv" },
  ];

  const contactReasonOptions = [
    { label: "Błąd na stronie", value: "bug" },
    { label: "Problem techniczny", value: "technical" },
    { label: "Pytanie o ogłoszenie", value: "listing" },
    { label: "Zgłoszenie nieodpowiedniego ogłoszenia", value: "reportListing" },
    { label: "Zgłoszenie użytkownika", value: "reportUser" },
    { label: "Problem z kontem", value: "account" },
    { label: "Problem z płatnością", value: "payment" },
    { label: "Pytanie o współpracę", value: "partnership" },
    { label: "Sugestia/Propozycja", value: "suggestion" },
    { label: "Problem z wyszukiwaniem", value: "search" },
    { label: "Problem z logowaniem", value: "login" },
    { label: "Pytanie o regulamin", value: "terms" },
    { label: "Pytanie o prywatność", value: "privacy" },
    { label: "Spam/Oszustwo", value: "spam" },
    { label: "Problem z weryfikacją", value: "verification" },
    { label: "Pytanie o funkcje premium", value: "premium" },
    { label: "Usunięcie konta", value: "deleteAccount" },
    { label: "Inne", value: "other" },
  ];

  const genderOptions = [
    { name: "Dowolna", id: null },
    { name: "Mężczyzna", id: "male" },
    { name: "Kobieta", id: "female" },
    { name: "Inne", id: "others" },
  ];

  const propertiesSortOptions = [
    { label: "Najnowsze", value: "newest" },
    { label: "Najstarsze", value: "oldest" },
    { label: "Cena rosnąco", value: "priceAsc" },
    { label: "Cena malejąco", value: "priceDesc" },
    { label: "Powierzchnia rosnąco", value: "sizeAsc" },
    { label: "Powierzchnia malejąco", value: "sizeDesc" },
  ];

  const usersSortOptions = [
    { label: "Brak", value: null },
    { label: "Najnowsze", value: "newest" },
    { label: "Wiek rosnąco", value: "ageAsc" },
    { label: "Wiek malejąco", value: "ageDesc" },
    { label: "Budżet rosnąco", value: "budgetAsc" },
    { label: "Budżet malejąco", value: "budgetDesc" },
  ];

  const interestsOptions = [
    { name: "Sport", id: "sports" },
    { name: "Muzyka", id: "music" },
    { name: "Podróże", id: "travel" },
    { name: "Gotowanie", id: "cooking" },
    { name: "Czytanie", id: "reading" },
    { name: "Gry", id: "gaming" },
    { name: "Filmy", id: "movies" },
    { name: "Sztuka", id: "art" },
    { name: "Fotografia", id: "photography" },
    { name: "Fitness", id: "fitness" },
    { name: "Taniec", id: "dance" },
    { name: "Yoga", id: "yoga" },
    { name: "Piesze wędrówki", id: "hiking" },
    { name: "Rowery", id: "cycling" },
    { name: "Technologia", id: "technology" },
  ];

  const occupationsOptions = [
    { name: "Student", id: "student" },
    { name: "Developer", id: "developer" },
    { name: "Designer", id: "designer" },
    { name: "Nauczyciel", id: "teacher" },
    { name: "Inżynier", id: "engineer" },
    { name: "Freelancer", id: "freelancer" },
    { name: "Marketing", id: "marketing" },
    { name: "Sprzedaż", id: "sales" },
    { name: "Lekarz", id: "doctor" },
    { name: "Pielęgniarka", id: "nurse" },
    { name: "Prawnik", id: "lawyer" },
    { name: "Architekt", id: "architect" },
    { name: "Manager", id: "manager" },
    { name: "Finansista", id: "finance" },
    { name: "Artysta", id: "artist" },
    { name: "Przedsiębiorca", id: "entrepreneur" },
    { name: "Pracownik zdalny", id: "remote_worker" },
    { name: "Nie pracuję", id: "unemployed" },
  ];

  const searchPreferencesOptions = [
    { name: "Cicha okolica", id: "quiet" },
    { name: "Centrum miasta", id: "central" },
    { name: "Blisko parku", id: "green" },
    { name: "Dobry transport", id: "transport" },
    { name: "Blisko uczelni", id: "university" },
    { name: "Blisko pracy", id: "work" },
    { name: "Sklepy w pobliżu", id: "shops" },
    { name: "Restauracje w pobliżu", id: "restaurants" },
    { name: "Siłownia w pobliżu", id: "gym" },
    { name: "Bezpieczna dzielnica", id: "safe" },
  ];

  const searchPropertyTypesOptions = [
    { name: "Mieszkanie", id: "apartment" },
    { name: "Dom", id: "house" },
    { name: "Kawalerka", id: "studio" },
    { name: "Pokój", id: "room" },
    { name: "Loft", id: "loft" },
  ];

  const noiseCompatibilityOptions = [
    { name: "Bardzo cicho", id: "very_quiet" },
    { name: "Cicho", id: "quiet" },
    { name: "Umiarkowanie", id: "moderate" },
    { name: "Głośno", id: "loud" },
    { name: "Bardzo głośno", id: "very_loud" },
  ];

  const petsCompatibilityOptions = [
    { name: "Bez zwierząt", id: "no_pets" },
    { name: "Koty", id: "cats" },
    { name: "Psy", id: "dogs" },
    { name: "Małe zwierzęta", id: "small_pets" },
    { name: "Wszystkie zwierzęta", id: "all_pets" },
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
  };
};