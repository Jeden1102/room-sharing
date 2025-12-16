<template>
  <div>
    <FloatLabel variant="on" class="w-full">
      <Textarea :id="name" :name :rows autoResize fluid :label />
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
const props = withDefaults(
  defineProps<{
    name: string;
    label: string;
    rows?: number;
    form: Record<string, FieldState>;
  }>(),
  {
    rows: 4,
  },
);

const fieldState: ComputedRef<FieldState | undefined> = computed(
  () => props.form?.[props.name],
);
</script>
