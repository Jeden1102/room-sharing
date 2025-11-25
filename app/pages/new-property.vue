<template>
  <div class="container max-w-screen-lg py-10">
    <PropertyForm />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  auth: true,
});

usePageSeo({
  title: "seo.newProperty.title",
  description: "seo.newProperty.description",
});
</script>
