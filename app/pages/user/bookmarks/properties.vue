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
        :title="$t('userBookmarksPage.empty.title')"
        :subtitle="$t('userBookmarksPage.empty.subtitle')"
        :showLogo="true"
        variant="primary"
      >
        <Button asChild v-slot="slotProps" severity="secondary">
          <RouterLink :to="$localePath('properties')" :class="slotProps.class">
            {{ $t("userBookmarksPage.empty.button") }}
          </RouterLink>
        </Button>
      </AppCta>
    </template>

    <p v-if="error">{{ $t("userBookmarksPage.error") }}</p>
  </div>
</template>

<script setup lang="ts">
usePageSeo({
  title: "seo.bookmarkedProperties.title",
  description: "seo.bookmarkedProperties.description",
});

const { data, error, pending } = await useFetch("/api/bookmark/properties");
</script>
