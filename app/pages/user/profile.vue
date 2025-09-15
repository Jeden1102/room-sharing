<template>
  <div>Profile {{ data }}</div>
</template>

<script setup lang="ts">
const { data } = useAuth();

definePageMeta({
  auth: true,
});
</script>
