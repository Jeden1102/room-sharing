<template>
  <main>
    <PropertyFull :property />
  </main>
</template>

<script setup lang="ts">
const route = useRoute();

definePageMeta({
  auth: false,
});

usePageSeo({
  title: "Property",
  description: "Single property",
});

const { data, error } = await useFetch(`/api/property/${route.query.id}`, {
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
