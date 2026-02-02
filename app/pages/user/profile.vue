<template>
  <UserProfile v-if="user" :user="user" :editable="true" />
  <UserProfileLoader v-if="pending" />
</template>

<script setup lang="ts">
definePageMeta({
  auth: true,
});

usePageSeo({
  title: "seo.profile.title",
  description: "seo.profile.description",
});

const { data: userData, pending } = await useFetch("/api/user/me", {
  lazy: true,
});
const user = computed(() => userData.value?.user || null);
</script>
