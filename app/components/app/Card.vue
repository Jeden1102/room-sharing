<template>
  <div class="card-base">
    <h2 class="mb-4 text-2xl font-bold text-gray-900">{{ title }}</h2>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<style scoped></style>
