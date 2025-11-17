<template>
  <main class="container flex flex-col gap-4 py-6">
    <div class="flex items-center md:mb-4 md:grid md:grid-cols-2 md:gap-8">
      <h1 class="text-xl font-medium md:text-2xl">Nieruchomości</h1>
      <div class="ml-auto flex gap-2">
        <PropertiesSorting
          @update="applyFilters"
          class="ml-auto hidden w-50 md:block"
        />
        <Button
          icon="pi pi-th-large"
          :severity="listingType === 'grid' ? 'primary' : 'secondary'"
          @click="listingType = 'grid'"
        >
        </Button>
        <Button
          icon="pi pi-map"
          :severity="listingType === 'grid' ? 'secondary' : 'primary'"
          @click="listingType = 'map'"
        >
        </Button>
      </div>

      <PropertiesFilters
        @update="applyFilters"
        :total="propertiesData?.total"
        :pending
        class="col-span-2"
      />
    </div>

    <!-- Properties List -->
    <div class="flex gap-4">
      <section
        :class="
          clsx(
            listingType === 'map' &&
              'no-scrollbar hidden lg:block lg:max-h-[80vh] lg:w-100 lg:overflow-y-auto lg:px-2',
          )
        "
      >
        <div
          :class="
            clsx(
              'grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6',
              listingType === 'map' && 'lg:!grid-cols-1',
            )
          "
        >
          <UserTeaserLoader v-if="pending" v-for="i in 8" :key="i" />
          <PropertyTeaser
            v-else-if="propertiesData"
            v-for="property in propertiesData.properties"
            :key="property.id"
            :property="property"
            variant="large"
          />
        </div>

        <p
          v-if="propertiesData?.properties.length === 0"
          class="mt-4 text-gray-500"
        >
          Brak wyników
        </p>

        <Paginator
          v-if="(propertiesData?.total || 0) > 0"
          class="mt-8"
          :rows="10"
          :totalRecords="propertiesData?.total"
          :first="(filters.page - 1) * 10"
          @page="onPageChange"
        />
      </section>

      <div
        :class="
          clsx(
            'overflow-hidden rounded-lg',
            listingType === 'grid' && 'hidden',
            listingType === 'map' && 'w-full lg:!block',
          )
        "
      >
        <PropertiesMap
          v-if="propertiesData?.coords"
          :items="propertiesData?.coords"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { PropertyWithOwner } from "@/components/property/types";

const route = useRoute();

type Coord = {
  latitude: number;
  longitude: number;
  id: string;
};

import clsx from "clsx";

const listingType = ref("grid");

watch(listingType, () => {
  // Fix issue with map tiles loading.
  window.dispatchEvent(new Event("resize"));
});

const filters = ref({
  listingType: null,
  type: null,
  city: route.query.city || "",
  priceMin: null,
  priceMax: null,
  roomsMin: null,
  sizeMin: null,
  amenities: [],
  preferences: [],
  sortBy: "newest",
  page: 1,
});

const { data: propertiesData, pending } = await useFetch<{
  properties: PropertyWithOwner[];
  total: number;
  coords: Coord[];
}>("/api/properties", {
  query: filters,
  watch: [filters],
});

const applyFilters = (newFilters: any) => {
  filters.value = { ...filters.value, ...newFilters, page: 1 };
};

const onPageChange = (event: any) => {
  filters.value.page = Math.floor(event.first / event.rows) + 1;
};
</script>
