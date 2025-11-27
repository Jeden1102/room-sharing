<template>
  <div>
    <h1 class="text-3xl font-semibold">{{ $t("forgotPasswordPage.title") }}</h1>
    <p class="mt-2 mb-6 font-light">{{ $t("forgotPasswordPage.subtitle") }}</p>
    <AuthForgotPassword />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "login",
  unauthenticatedOnly: true,
});

const { t } = useI18n();

usePageSeo({
  title: t("seo.forgotPassword.title"),
  description: t("seo.forgotPassword.description"),
});
</script>
