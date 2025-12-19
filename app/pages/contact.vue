<template>
  <main class="container flex flex-col gap-6 py-6">
    <AppHeading :showBreadcrumbs="true" class="my-2">
      {{ $t("nav.contact") }}
    </AppHeading>
    <AppImageContent image="/images/contact.png" :alt="$t('seo.contact.image')">
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
