<template>
  <UserProfile v-if="user" :user="user" />
</template>

<script setup lang="ts">
definePageMeta({
  auth: true,
});

usePageSeo({
  title: "Profile",
  description: "User profile",
});

const { data: userData } = await useFetch("/api/user/me", {
  lazy: true,
  cache: "no-cache",
});
const user = computed(() => userData.value?.user || null);
</script>
