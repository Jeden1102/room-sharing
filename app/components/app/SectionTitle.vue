<template>
  <section class="mb-4 flex flex-col gap-2 md:gap-3 md:text-center">
    <p class="text-sm text-gray-600 uppercase md:text-base">{{ subtitle }}</p>
    <h2 class="mb-2 text-2xl font-semibold md:text-3xl">{{ title }}</h2>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>
