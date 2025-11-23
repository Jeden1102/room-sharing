<template>
  <div>
    <PropertyTeaserLoader v-if="pending" v-for="i in 8" :key="i" />
    <template v-else-if="data.properties">
      <div class="grid gap-4 md:grid-cols-2" v-if="data.properties.length > 0">
        <PropertyTeaser
          v-for="property in data.properties"
          :key="property.id"
          :property="property.property"
          variant="large"
        />
      </div>

      <AppCta
        v-else
        title="You don't have any bookmarked properties yet"
        subtitle="Explore the properties we have for you. Bookmark a property and it will show up here."
        :showLogo="true"
        variant="primary"
      >
        <Button asChild v-slot="slotProps" severity="secondary">
          <RouterLink :to="$localePath('properties')" :class="slotProps.class">
            Explore properties
          </RouterLink>
        </Button>
      </AppCta>
    </template>

    <p v-if="error">Błąd pobierania nieruchomości</p>
  </div>
</template>

<script setup lang="ts">
usePageSeo({
  title: "Bookmarks",
  description: "Saved properties",
});

const { data, error, pending } = await useFetch("/api/bookmark/properties");
</script>
