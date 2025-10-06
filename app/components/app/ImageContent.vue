<template>
  <div class="flex flex-col gap-4 md:flex-row md:items-center lg:gap-12">
    <NuxtImg
      :src="image"
      :alt="alt"
      :loading="loading || 'lazy'"
      format="webp"
      class="flex-1"
    />
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  image: string;
  alt?: string;
  loading?: "lazy" | "eager";
}>();
</script>
