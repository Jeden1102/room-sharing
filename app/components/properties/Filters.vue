<template>
  <aside>
    <button
      @click="filtersOpened = !filtersOpened"
      class="grid place-content-center md:hidden"
    >
      <Icon name="mage:filter" class="text-2xl" />
    </button>

    <div
      :class="
        clsx(
          'fixed top-0 left-full z-20 flex size-full max-h-screen w-full flex-col gap-4 overflow-y-auto bg-white p-4 transition-all duration-300 md:static md:grid md:grid-cols-3 md:bg-transparent md:p-0 md:pt-2 lg:grid-cols-4 lg:bg-transparent md:[&>div]:w-full',
          { '!left-0': filtersOpened },
        )
      "
    >
      <div class="flex items-center justify-between md:hidden">
        <h2 class="mb-4 text-lg font-semibold">
          {{ $t("propertiesFilters.title") }}
        </h2>
        <button @click="filtersOpened = !filtersOpened">
          <Icon name="mage:filter" class="text-2xl" />
        </button>
      </div>

      <!-- City -->
      <AtomsAutocomplete
        :suggestions="filteredCities"
        @complete="searchCity"
        :label="$t('propertiesFilters.city.label')"
        v-model="filters.city"
        name="city"
      />

      <!-- Listing Type -->
      <AtomsDropdown
        :label="$t('propertiesFilters.listingType.label')"
        :options="listingTypeOptions"
        optionLabel="label"
        optionValue="value"
        v-model="filters.listingType"
        name="listingType"
      />

      <!-- Property Type -->
      <AtomsDropdown
        :label="$t('propertiesFilters.propertyType.label')"
        :options="propertyTypeOptions"
        optionLabel="label"
        optionValue="value"
        v-model="filters.type"
        name="type"
      />

      <!-- Price Range -->
      <div class="flex gap-2 md:gap-4">
        <AtomsNumber
          :label="$t('propertiesFilters.priceMin.label')"
          v-model="filters.priceMin"
          name="priceMin"
        />
        <AtomsNumber
          :label="$t('propertiesFilters.priceMax.label')"
          v-model="filters.priceMax"
          name="priceMax"
        />
      </div>

      <AtomsNumber
        :label="$t('propertiesFilters.roomsMin.label')"
        v-model="filters.roomsMin"
        name="roomsMin"
      />
      <AtomsNumber
        :label="$t('propertiesFilters.sizeMin.label')"
        v-model="filters.sizeMin"
        name="sizeMin"
      />

      <!-- Amenities MultiSelect -->
      <div>
        <AtomsMultiselect
          id="amenities"
          name="amenities"
          v-model="filters.amenities"
          :options="[...amenitiesOptions, ...mediasOptions]"
          optionLabel="label"
          optionValue="value"
          :label="$t('propertiesFilters.amenities.label')"
          display="chip"
          fluid
        />
      </div>

      <Divider class="md:!hidden" />

      <!-- Sorting (mobile only) -->
      <AtomsDropdown
        :label="$t('propertiesFilters.sortBy.label')"
        :options="propertiesSortOptions"
        optionLabel="label"
        optionValue="value"
        v-model="filters.sortBy"
        name="sortBy"
        class="md:hidden"
      />

      <!-- Apply (mobile only) -->
      <Button
        class="mt-4 min-h-10 md:!hidden"
        :label="$t('propertiesFilters.showResults', { count: total })"
        :loading="pending"
        @click="filtersOpened = false"
      />

      <Button
        severity="secondary"
        class="flex items-center gap-2 md:!hidden"
        @click="clearFilters"
      >
        <Icon name="fa7-solid:undo" class="text-sm" />
        {{ $t("propertiesFilters.clearFilters") }}
      </Button>
    </div>
    <button
      class="mt-2 hidden cursor-pointer items-center gap-2 pl-2 text-xs text-gray-600 md:flex"
      @click="clearFilters"
    >
      <Icon name="fa7-solid:undo" class="text-xs" />
      {{ $t("propertiesFilters.clearFilters") }}
    </button>
  </aside>
</template>

<script setup lang="ts">
import clsx from "clsx";

const props = defineProps<{
  total?: number;
  pending: boolean;
  defaultFilters: any;
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

const filters = reactive({ ...props.defaultFilters });

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

const {
  listingTypeOptions,
  propertyTypeOptions,
  amenitiesOptions,
  mediasOptions,
  propertiesSortOptions,
} = useTaxonomies();

const clearFilters = () => {
  Object.assign(filters, defaultFilters);
  filters.city = "";
};
</script>
