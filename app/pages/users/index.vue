<template>
  <main class="container flex max-w-5xl flex-col gap-6 py-6">{{ users }}</main>
</template>

<script setup lang="ts">
const route = useRoute();

definePageMeta({
  auth: true,
});

usePageSeo({
  title: "Profile",
  description: "User profile",
});

const { data: usersData } = await useFetch(`/api/users`, {
  cache: "no-cache",
});

const users = computed(() => usersData.value || null);
</script>
