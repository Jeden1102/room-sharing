<template>
  <main>
    <PropertyFull :property />
    <div class="container mt-4 lg:mt-12">
      <LazyHomeItemsCarousel
        hydrate-on-visible
        v-if="data && data.similarProperties"
        title="Podobne ogłoszenia"
        subtitle="Odkryj podobne ogłoszenia"
        :items="data?.similarProperties"
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

usePageSeo({
  title: "seo.property.title",
  description: "seo.property.description",
});

const { data, error } = await useFetch<{
  property: PropertyWithOwner;
  similarProperties: PropertyWithOwner[];
}>(`/api/property/${route.query.id}?getSimilar=true`, {
  cache: "no-cache",
});

if (error.value || !data.value?.property) {
  throw createError({
    statusCode: 404,
    statusMessage: "Property not found",
    fatal: true,
  });
}

const property = computed(() => data.value?.property || null);
</script>
