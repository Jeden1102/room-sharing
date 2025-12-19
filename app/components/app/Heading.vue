<template>
  <div class="flex flex-col gap-4">
    <AppBreadcrumbs v-if="showBreadcrumbs" />
    <h1 class="text-xl font-medium md:text-2xl">
      <slot />
    </h1>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ showBreadcrumbs?: boolean }>();
</script>
