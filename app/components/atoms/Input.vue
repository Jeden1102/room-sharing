<template>
  <div>
    <FloatLabel variant="on">
      <InputText :id="name" :name fluid />
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
}>();

const form = inject<any>("formContext");
const fieldState = computed(() => form?.[props.name]);
</script>
