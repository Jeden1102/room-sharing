<template>
  <main class="container flex max-w-5xl flex-col gap-6 py-6">
    Here single property {{ route.query.id }}
  </main>
</template>

<script setup lang="ts">
const route = useRoute();

definePageMeta({
  auth: false,
});

usePageSeo({
  title: "Property",
  description: "Single property",
});

// const { data: userData, error } = await useFetch(
//   `/api/users/${route.query.id}`,
//   {
//     cache: "no-cache",
//   },
// );

// if (error.value || !userData.value?.user) {
//   throw createError({
//     statusCode: 404,
//     statusMessage: "User not found",
//     fatal: true,
//   });
// }

// const user = computed(() => userData.value?.user || null);
</script>
