<template>
  <div>
    <h1 class="text-3xl font-semibold">{{ $t("loginPage.title") }}</h1>
    <p class="mt-2 mb-6 font-light">
      {{ $t("loginPage.subtitle") }}
    </p>
    <AuthLogin />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "login",
  unauthenticatedOnly: true,
});

const { t } = useI18n();

usePageSeo({
  title: t("seo.login.title"),
  description: t("seo.login.description"),
});
</script>
