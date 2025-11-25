<template>
  <main class="container flex flex-col gap-6 py-6">
    <AppHeading> Terms </AppHeading>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  auth: false,
});

usePageSeo({
  title: "seo.terms.title",
  description: "seo.terms.description",
});
</script>
