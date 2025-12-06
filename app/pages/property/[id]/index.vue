<template>
  <main>
    <PropertyFull :property />
    <div class="container mt-4 lg:mt-12">
      <LazyHomeItemsCarousel
        hydrate-on-visible
        v-if="propertyData && propertyData.similarProperties"
        :title="$t('propertyPage.similar.title')"
        :subtitle="$t('propertyPage.similar.subtitle')"
        :items="propertyData?.similarProperties"
        :showNavigation="false"
        entity="property"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import type { PropertyWithOwner } from "@/components/property/types";

const route = useRoute();

definePageMeta({
  auth: false,
});

const { data: propertyData, error } = await useFetch<{
  property: PropertyWithOwner;
  similarProperties: PropertyWithOwner[];
}>(`/api/property/${route.query.id}?getSimilar=true`, {
  cache: "no-cache",
});

const fetchError = error.value;

if (fetchError || !propertyData.value?.property) {
  const statusCode = fetchError?.statusCode || 404;
  const statusMessage = fetchError?.statusMessage || "Property not found";

  throw createError({
    statusCode: statusCode,
    statusMessage: statusMessage,
    fatal: true,
  });
}

const property = computed(() => propertyData.value?.property || null);

usePageSeo({
  title: property.value?.title || "seo.property.title",
  description: property.value?.description || "seo.property.description",
  image: property.value?.images[0],
});
</script>
