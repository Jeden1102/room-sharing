<template>
  <UserProfile v-if="user" :user="user" :editable="true" />
  <UserProfileLoader v-if="pending" />
</template>

<script setup lang="ts">
definePageMeta({
  auth: true,
});

usePageSeo({
  title: "Profile",
  description: "User profile",
});

const { data: userData, pending } = await useFetch("/api/user/me", {
  lazy: true,
  cache: "no-cache",
});
const user = computed(() => userData.value?.user || null);
</script>
