<template>
  <div class="flex items-center justify-between border-b border-gray-200 pb-4">
    <div class="flex items-center gap-3">
      <Icon :name="icon" />
      <span class="text-gray-700">{{ label }}</span>
    </div>
    <span class="font-semibold text-gray-900">{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ icon: string; label: string; value: string }>();
</script>
