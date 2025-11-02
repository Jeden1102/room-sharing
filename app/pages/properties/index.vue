<template>
  <main class="container flex flex-col gap-4 py-6">
    <div
      class="flex items-center justify-between md:mb-4 md:grid md:grid-cols-2 md:gap-8"
    >
      <h1 class="text-xl font-medium md:text-2xl">Oferty nieruchomości</h1>
      <PropertiesSorting
        @update="applyFilters"
        class="ml-auto hidden w-50 md:block"
      />
      <PropertiesFilters
        @update="applyFilters"
        :total="propertiesData?.total"
        :pending
        class="col-span-2"
      />
    </div>

    <!-- Properties List -->
    <section>
      <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <UserTeaserLoader v-if="pending" v-for="i in 8" :key="i" />
        <PropertyTeaser
          v-else-if="propertiesData"
          v-for="property in propertiesData.properties"
          :key="property.id"
          :property="property"
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
  </main>
</template>

<script setup lang="ts">
const filters = ref({
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
  page: 1,
});

const {
  data: propertiesData,
  pending,
  refresh,
} = await useFetch("/api/properties", {
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
