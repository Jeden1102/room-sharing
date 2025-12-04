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

const i18n = {
  defaultLocale: "pl",
  customRoutes: "config",
  pages: {
    contact: {
      en: "/contact",
      pl: "/kontakt",
    },
    "properties-filters": {
      en: "/properties",
      pl: "/oferty",
    },
    "auth-confirm-email": {
      en: "",
      pl: "",
    },
    "auth-forgot-password": {
      en: "",
      pl: "",
    },
    "auth-login": {
      en: "",
      pl: "",
    },
    "auth-register": {
      en: "",
      pl: "",
    },
    "auth-reset-password": {
      en: "",
      pl: "",
    },
    "property-id": {
      en: "",
      pl: "",
    },
    "property-id-edit": {
      en: "",
      pl: "",
    },
  },
  locales: [
    { code: "en", name: "English", file: "en.json" },
    { code: "pl", name: "Polish", file: "pl.json" },
  ],
};
</script>
