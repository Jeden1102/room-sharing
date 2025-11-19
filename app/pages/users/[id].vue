<template>
  <main class="container flex max-w-5xl flex-col gap-6 py-6">
    <UserProfile v-if="user" :user="user" :editable="false" />
  </main>
</template>

<script setup lang="ts">
const route = useRoute();

usePageSeo({
  title: "Profile",
  description: "User profile",
});

const { data: userData, error } = await useFetch(
  `/api/users/${route.query.id}`,
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
