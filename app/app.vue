<template>
  <NuxtLayout>
    <AppCookieBanner />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { locale } = useI18n();

useHead({
  meta: [{ name: "lang", content: locale }],
  link: [{ rel: "icon", type: "image/png", href: "/logo.png" }],
  htmlAttrs: {
    lang: locale,
  },
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Pokój Z Wami` : "Pokój Z Wami";
  },
});
</script>
