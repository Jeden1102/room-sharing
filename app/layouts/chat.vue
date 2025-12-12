<template>
  <NuxtLoadingIndicator :height="4" color="#00509d" />
  <AppHeader class="hidden md:block" />
  <slot />
</template>

<script setup lang="ts">
onMounted(() => {
  document.body.classList.add("!overflow-hidden");
});

onUnmounted(() => {
  document.body.classList.remove("!overflow-hidden");
});
</script>
