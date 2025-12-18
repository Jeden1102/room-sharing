<template>
  <div>
    <FloatLabel variant="on">
      <MultiSelect
        :id
        :name
        :options
        :optionLabel
        :optionValue
        :placeholder
        display="chip"
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
  options: any[] | undefined;
  optionLabel?: string;
  optionValue?: string;
  placeholder?: string;
  form?: Record<string, FieldState> | null;
}>();
const model = defineModel();
const id = useId();

const fieldState = computed(() => props.form?.[props.name]);
</script>
