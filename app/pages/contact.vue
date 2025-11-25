<template>
  <main class="container flex flex-col gap-6 py-6">
    <AppImageContent image="/images/contact.png">
      <FormContact />
    </AppImageContent>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  auth: false,
});

usePageSeo({
  title: "seo.contact.title",
  description: "seo.contact.description",
});
</script>
