<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { locale } = useI18n();

useHead({
  meta: [{ name: "lang", content: locale }],
  htmlAttrs: {
    lang: locale,
  },
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | RealPro` : "RealPro";
  },
});
</script>
