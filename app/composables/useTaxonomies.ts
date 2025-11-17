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
  
    return {
      listingTypeOptions,
      propertyTypeOptions,
      amenitiesOptions,
      mediasOptions,
      contactReasonOptions,
      genderOptions
    };
  };