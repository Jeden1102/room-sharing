<template>
  <div class="flex items-center gap-3">
    <Icon
      name="material-symbols:check-rounded"
      class="text-primary-500 text-xl"
    />
    <span class="text-gray-700">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string }>();
</script>
