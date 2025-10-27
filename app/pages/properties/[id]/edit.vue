<template>
  <main class="container flex max-w-5xl flex-col gap-6 py-6">
    Here edit single property {{ route.query.id }}
    {{ property }}

    <Button asChild v-slot="buttonProps">
      <RouterLink
        :class="buttonProps.class"
        :to="
          $localePath({
            name: 'properties-id',
            params: {
              id: slugify(property.title),
            },
            query: { id: property.id },
          })
        "
      >
        Edit
      </RouterLink>
    </Button>
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
