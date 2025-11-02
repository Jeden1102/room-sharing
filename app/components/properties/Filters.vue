<template>
  <aside>
    <button @click="filtersOpened = !filtersOpened" class="md:hidden">
      <Icon name="mage:filter" class="text-2xl" />
    </button>

    <div
      :class="
        clsx(
          'fixed top-0 left-full z-20 flex size-full w-full flex-col gap-4 bg-white p-4 transition-all duration-300 md:static md:grid md:grid-cols-3 md:p-0 lg:grid-cols-4 md:[&>div]:w-full',
          { '!left-0': filtersOpened },
        )
      "
    >
      <div class="flex items-center justify-between md:hidden">
        <h2 class="mb-4 text-lg font-semibold">Filtry</h2>
        <button @click="filtersOpened = !filtersOpened">
          <Icon name="mage:filter" class="text-2xl" />
        </button>
      </div>

      <!-- City -->
      <AtomsAutocomplete
        v-model="filters.city"
        :suggestions="filteredCities"
        @complete="searchCity"
        placeholder="Wpisz miasto"
        name="city"
      />

      <!-- Listing Type -->
      <AtomsDropdown
        label="Typ oferty"
        :options="listingTypeOptions"
        optionLabel="name"
        optionValue="id"
        v-model="filters.listingType"
        name="listingType"
      />

      <!-- Property Type -->
      <AtomsDropdown
        label="Typ nieruchomości"
        :options="propertyTypeOptions"
        optionLabel="name"
        optionValue="id"
        v-model="filters.type"
        name="type"
      />

      <!-- Price Range -->
      <div class="flex gap-2 md:gap-4">
        <AtomsNumber
          label="Cena min"
          v-model="filters.priceMin"
          name="priceMin"
        />
        <AtomsNumber
          label="Cena max"
          v-model="filters.priceMax"
          name="priceMax"
        />
      </div>

      <AtomsNumber
        label="Min. liczba pokoi"
        v-model="filters.roomsMin"
        name="roomsMin"
      />
      <AtomsNumber
        label="Min. powierzchnia (m²)"
        v-model="filters.sizeMin"
        name="sizeMin"
      />

      <!-- Amenities MultiSelect -->
      <div>
        <MultiSelect
          id="amenities"
          name="amenities"
          v-model="filters.amenities"
          :options="amenitiesOptions"
          optionLabel="name"
          optionValue="id"
          placeholder="Wybierz udogodnienia"
          display="chip"
          fluid
        />
      </div>

      <!-- Preferences MultiSelect -->
      <div>
        <MultiSelect
          id="preferences"
          name="preferences"
          v-model="filters.preferences"
          :options="preferencesOptions"
          optionLabel="name"
          optionValue="id"
          placeholder="Wybierz preferencje"
          display="chip"
          fluid
        />
      </div>

      <Divider class="md:!hidden" />

      <!-- Sorting (mobile only) -->
      <AtomsDropdown
        label="Sortuj według"
        :options="sortOptions"
        optionLabel="label"
        optionValue="value"
        v-model="filters.sortBy"
        name="sortBy"
        class="md:hidden"
      />

      <!-- Apply (mobile only) -->
      <Button
        class="mt-4 md:!hidden"
        :label="`Wyświetl wyniki (${total})`"
        :loading="pending"
        @click="filtersOpened = false"
      />

      <Button
        severity="secondary"
        class="flex items-center gap-2 md:!hidden"
        @click="clearFilters"
        v-if="anyFiltersSet"
      >
        <Icon name="fa7-solid:undo" class="text-sm" />
        Wyczyść filtry
      </Button>
    </div>
    <button
      class="mt-2 hidden cursor-pointer items-center gap-2 pl-2 text-xs text-gray-600 md:flex"
      @click="clearFilters"
      v-if="anyFiltersSet"
    >
      <Icon name="fa7-solid:undo" class="text-xs" />
      Wyczyść filtry
    </button>
  </aside>
</template>

<script setup lang="ts">
import clsx from "clsx";

const props = defineProps<{
  total?: number;
  pending: boolean;
}>();

const emit = defineEmits(["update"]);

const filtersOpened = ref(false);
const debounceTimeout = ref<NodeJS.Timeout>();

const defaultFilters = {
  listingType: null,
  type: null,
  city: "",
  priceMin: null,
  priceMax: null,
  roomsMin: null,
  sizeMin: null,
  amenities: [],
  preferences: [],
  sortBy: "newest",
};

const filters = reactive({ ...defaultFilters });

const anyFiltersSet = computed(() => {
  return JSON.stringify(filters) !== JSON.stringify(defaultFilters);
});

watch(
  () => filtersOpened.value,
  () => {
    document.body.classList.toggle("!overflow-y-hidden");
  },
);

watch(
  filters,
  (val) => {
    clearTimeout(debounceTimeout.value);
    debounceTimeout.value = setTimeout(() => {
      emit("update", { ...val });
    }, 500);
  },
  { deep: true },
);

const filteredCities = ref<any[]>([]);
const searchCity = async (event: any) => {
  const query = event.query?.trim();
  if (!query) return (filteredCities.value = []);

  try {
    const res = await $fetch(
      `/api/geo/autocomplete?q=${encodeURIComponent(query)}`,
    );
    filteredCities.value =
      res?.predictions?.map((p: any) => p.description.split(",")[0]) || [];
  } catch (err) {
    console.error("Error loading cities:", err);
  }
};

const listingTypeOptions = [
  { name: "Dowolny", id: null },
  { name: "Wynajem", id: "RENT" },
  { name: "Sprzedaż", id: "SALE" },
];

const propertyTypeOptions = [
  { name: "Dowolny", id: null },
  { name: "Mieszkanie", id: "APARTMENT" },
  { name: "Dom", id: "HOUSE" },
  { name: "Pokój", id: "ROOM" },
  { name: "Studio", id: "STUDIO" },
];

const amenitiesOptions = [
  { name: "Umeblowane", id: "furnished" },
  { name: "Balkon", id: "balcony" },
  { name: "Winda", id: "elevator" },
  { name: "Parking", id: "parking" },
  { name: "Internet", id: "internet" },
  { name: "Pralka", id: "washingMachine" },
];

const preferencesOptions = [
  { name: "Zwierzęta dozwolone", id: "petsAllowed" },
  { name: "Palenie dozwolone", id: "smokingAllowed" },
];

const sortOptions = [
  { label: "Najnowsze", value: "newest" },
  { label: "Najstarsze", value: "oldest" },
  { label: "Cena rosnąco", value: "priceAsc" },
  { label: "Cena malejąco", value: "priceDesc" },
  { label: "Powierzchnia rosnąco", value: "sizeAsc" },
  { label: "Powierzchnia malejąco", value: "sizeDesc" },
];

const clearFilters = () => {
  Object.assign(filters, defaultFilters);
};
</script>
