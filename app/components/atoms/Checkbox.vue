<template>
  <div class="flex flex-row items-center gap-2">
    <Checkbox :id="name" :name binary :label />
    <label :for="name">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string;
  label: string;
}>();

const form = inject<any>("formContext");
const fieldState = computed(() => form?.[props.name]);
</script>
