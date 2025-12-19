<template>
  <main class="container flex flex-col gap-6 py-6">
    <AppHeading :showBreadcrumbs="true" class="container my-4">
      {{ $t("seo.terms.title") }}
    </AppHeading>
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
