<template>
  <div class="flex flex-row items-center gap-2">
    <Checkbox :inputId="name" :name binary :label v-model="model" />
    <label :for="name">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  label: string;
}>();

const model = defineModel();
</script>
