<template>
  <main class="container flex flex-col gap-6 py-6">
    <AppHeading> Contact </AppHeading>
    <AppImageContent image="/images/contact.png">
      <p class="mb-4 text-lg font-medium">
        We are here to help you with any questions or concerns you may have.
      </p>
      <FormContact />
    </AppImageContent>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  auth: false,
});

usePageSeo({
  title: "Contact",
  description: "Contact us",
});
</script>
