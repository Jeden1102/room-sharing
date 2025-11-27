<template>
  <div>
    <h1 class="text-3xl font-semibold">{{ $t("registerPage.title") }}</h1>
    <p class="mt-2 mb-6 font-light">
      {{ $t("registerPage.subtitle") }}
    </p>
    <AuthRegister />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "login",
  unauthenticatedOnly: true,
});

const { t } = useI18n();

usePageSeo({
  title: t("seo.register.title"),
  description: t("seo.register.description"),
});
</script>
