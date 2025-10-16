<template>
  <aside>
    <button @click="filtersOpened = !filtersOpened">
      <Icon name="mage:filter" class="text-2xl" />
    </button>
    <div
      :class="
        clsx(
          'fixed top-0 left-full z-20 flex size-full w-full flex-col gap-4 bg-white p-4 transition-all duration-300 lg:static',
          {
            '!left-0': filtersOpened,
          },
        )
      "
    >
      <div class="flex items-center justify-between">
        <h2 class="mb-4 text-lg font-semibold">Filtry</h2>
        <button @click="filtersOpened = !filtersOpened">
          <Icon name="mage:filter" class="text-2xl" />
        </button>
      </div>

      <AtomsAutocomplete
        label="Miasto"
        v-model="filters.city"
        :suggestions="filteredCities"
        @complete="searchCity"
        placeholder="Wpisz miasto"
        name="city"
      />

      <!-- Gender -->
      <AtomsDropdown
        label="Płeć"
        :options="genderOptions"
        optionLabel="name"
        optionValue="id"
        v-model="filters.gender"
        name="gender"
      />

      <!-- Budget -->
      <AtomsNumber
        label="Budżet maksymalny"
        v-model="filters.budgetMax"
        name="budgetMax"
      />

      <!-- Smoker / Pets -->
      <div class="flex flex-col gap-2">
        <AtomsCheckbox
          label="Nie pali"
          v-model="filters.nonSmoker"
          name="nonSmoker"
        />
        <AtomsCheckbox
          label="Bez zwierząt"
          v-model="filters.noPets"
          name="noPets"
        />
      </div>

      <Divider />
      <!-- Sorting -->
      <AtomsDropdown
        label="Sortuj według"
        :options="sortOptions"
        optionLabel="label"
        optionValue="value"
        v-model="filters.sortBy"
        name="sortBy"
      />

      <Button
        class="mt-4"
        :label="`Wyświetl wyniki (${total})`"
        :loading="pending"
        @click="filtersOpened = false"
      />
    </div>
  </aside>
</template>

<script setup lang="ts">
import clsx from "clsx";

const props = defineProps<{
  total: number;
  pending: boolean;
}>();

const filtersOpened = ref(false);

watch(
  () => filtersOpened.value,
  () => {
    document.body.classList.toggle("!overflow-y-hidden");
  },
);

const emit = defineEmits(["update"]);

const filters = reactive({
  gender: null,
  city: "",
  nonSmoker: false,
  noPets: false,
  budgetMax: null,
  sortBy: "newest",
});

const genderOptions = [
  { name: "Dowolna", id: null },
  { name: "Mężczyzna", id: "male" },
  { name: "Kobieta", id: "female" },
  { name: "Inne", id: "others" },
];

const sortOptions = [
  { label: "Brak", value: null },
  { label: "Najnowsze", value: "newest" },
  { label: "Wiek rosnąco", value: "ageAsc" },
  { label: "Wiek malejąco", value: "ageDesc" },
  { label: "Budżet rosnąco", value: "budgetAsc" },
  { label: "Budżet malejąco", value: "budgetDesc" },
];

const filteredCities = ref<any[]>([]);
const debounceTimeout = ref<NodeJS.Timeout>();

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

// Emit changes (debounced)
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
</script>
