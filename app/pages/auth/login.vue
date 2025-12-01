<template>
  <div>
    <Message v-if="Object.keys(route.query).length" class="mb-8 px-1 py-2">
      {{ mapFeatureInfo }}
    </Message>
    <h1 class="text-3xl font-semibold">{{ $t("loginPage.title") }}</h1>
    <p class="mt-2 mb-6 font-light">
      {{ $t("loginPage.subtitle") }}
    </p>
    <AuthLogin />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

definePageMeta({
  layout: "login",
  unauthenticatedOnly: true,
});

const { t } = useI18n();

usePageSeo({
  title: t("seo.login.title"),
  description: t("seo.login.description"),
});

const mapFeatureInfo = computed(() => {
  const featuresMessage = {
    bookmarks: t("loginPage.feature.bookmarks"),
    newProperty: t("loginPage.feature.newProperty"),
  };

  return featuresMessage[route.query.feat as keyof typeof featuresMessage];
});
</script>
