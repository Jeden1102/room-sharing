<template>
  <div>
    <FloatLabel variant="on">
      <InputNumber :id="name" :name fluid v-model="model" />
      <label :for="name">{{ label }}</label>
    </FloatLabel>
    <Message
      v-if="fieldState?.invalid"
      severity="error"
      size="small"
      variant="simple"
    >
      {{ fieldState.error.message }}
    </Message>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string;
  label: string;
  form?: Record<string, FieldState> | null;
}>();
const model = defineModel<number | null>();

const fieldState = computed(() => props.form?.[props.name]);
</script>
