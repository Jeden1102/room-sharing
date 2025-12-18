<template>
  <aside>
    <button
      @click="filtersOpened = !filtersOpened"
      class="md:hidden"
      :title="$t('propertiesFilters.toggleFilters')"
    >
      <Icon name="mage:filter" class="text-2xl" />
    </button>

    <div
      :class="
        clsx(
          'fixed top-0 left-full z-20 flex size-full max-h-screen w-full flex-col gap-4 overflow-y-visible bg-white p-4 transition-all duration-300 md:static md:flex-row md:bg-transparent md:p-0 md:[&>div]:w-full',
          { '!left-0': filtersOpened },
        )
      "
    >
      <div class="flex items-center justify-between md:hidden">
        <h2 class="mb-4 text-lg font-semibold">
          {{ $t("usersFilters.title") }}
        </h2>
        <button
          @click="filtersOpened = !filtersOpened"
          :title="$t('propertiesFilters.toggleFilters')"
        >
          <Icon name="mage:filter" class="text-2xl" />
        </button>
      </div>

      <!-- City -->
      <AtomsAutocomplete
        :label="$t('usersFilters.city.label')"
        v-model="filters.city"
        :suggestions="filteredCities"
        @complete="searchCity"
        name="city"
      />

      <!-- Gender -->
      <AtomsDropdown
        :label="$t('usersFilters.gender.label')"
        :options="genderOptions"
        optionLabel="label"
        optionValue="value"
        v-model="filters.gender"
        name="gender"
      />

      <!-- Budget -->
      <AtomsNumber
        :label="$t('usersFilters.budgetMax.label')"
        v-model="filters.budgetMax"
        name="budgetMax"
      />

      <!-- Smoker / Pets -->
      <div class="flex flex-col gap-2 md:flex-row md:gap-4">
        <AtomsBaseCheckbox
          :label="$t('usersFilters.nonSmoker.label')"
          v-model="filters.nonSmoker"
          name="nonSmoker"
        />
        <AtomsBaseCheckbox
          :label="$t('usersFilters.noPets.label')"
          v-model="filters.noPets"
          name="noPets"
        />
      </div>

      <Divider class="md:!hidden" />

      <!-- Sorting (mobile only) -->
      <AtomsDropdown
        :label="$t('usersFilters.sortBy.label')"
        :options="usersSortOptions"
        optionLabel="label"
        optionValue="value"
        v-model="filters.sortBy"
        name="sortBy"
        class="md:hidden"
      />

      <!-- Apply (mobile only) -->
      <Button
        class="mt-4 min-h-10 md:!hidden"
        :label="$t('usersFilters.showResults', { count: total })"
        :loading="pending"
        @click="filtersOpened = false"
      />

      <Button
        severity="secondary"
        class="flex min-h-10 items-center gap-2 md:!hidden"
        @click="clearFilters"
        v-if="anyFiltersSet"
      >
        <Icon name="fa7-solid:undo" class="text-sm" />
        {{ $t("usersFilters.clearFilters") }}
      </Button>
    </div>
    <button
      class="mt-2 hidden cursor-pointer items-center gap-2 pl-2 text-xs text-gray-600 md:flex"
      @click="clearFilters"
      v-if="anyFiltersSet"
    >
      <Icon name="fa7-solid:undo" class="text-xs" />
      {{ $t("usersFilters.clearFilters") }}
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

const route = useRoute();

const defaultFilters = {
  gender: null,
  city: route.query.city || "",
  nonSmoker: false,
  noPets: false,
  budgetMax: null,
  sortBy: "newest",
};

const filters = reactive({ ...defaultFilters });

const anyFiltersSet = computed(() => {
  return JSON.stringify(filters) !== JSON.stringify(defaultFilters);
});

watch(
  () => filtersOpened.value,
  () => {
    document.body.classList.toggle("!overflow-hidden");
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

const filteredCities = ref<string[]>([]);
const searchCity = async (event: { query: string }) => {
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

const { genderOptions, usersSortOptions } = useTaxonomies();

const clearFilters = () => {
  Object.assign(filters, defaultFilters);
};
</script>
