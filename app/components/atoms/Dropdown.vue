<template>
  <div>
    <FloatLabel variant="on">
      <Dropdown
        :id
        :name
        :options
        :optionLabel
        :optionValue
        :label
        fluid
        v-model="model"
      />
      <label :for="id">{{ label }}</label>
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
  options: any[];
  optionLabel?: string;
  optionValue?: string;
  form?: Record<string, FieldState> | null;
}>();

const model = defineModel();

const id = useId();

const fieldState = computed(() => props.form?.[props.name]);
</script>
