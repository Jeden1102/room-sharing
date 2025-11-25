<template>
  <main class="container flex max-w-5xl flex-col gap-6 py-6">
    <UserProfile v-if="user" :user="user" :editable="false" />
    <LazyHomeItemsCarousel
      hydrate-on-visible
      v-if="userData && userData.similarUsers"
      title="Podobni uzytkownicy"
      subtitle="Odkryj innych uzytkownikow"
      :items="userData.similarUsers"
      :showNavigation="false"
      entity="user"
      class="lg:mt-8"
    />
  </main>
</template>

<script setup lang="ts">
const route = useRoute();

usePageSeo({
  title: "seo.user.title",
  description: "seo.user.description",
});

const { data: userData, error } = await useFetch(
  `/api/users/${route.query.id}?getSimilar=true`,
  {
    cache: "no-cache",
  },
);

if (error.value || !userData.value?.user) {
  throw createError({
    statusCode: 404,
    statusMessage: "User not found",
    fatal: true,
  });
}

const user = computed(() => userData.value?.user || null);
</script>
