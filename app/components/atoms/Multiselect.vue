<template>
  <div>
    <FloatLabel variant="on">
      <MultiSelect
        :id="name"
        :name
        :options
        :optionLabel
        :optionValue
        :placeholder
        display="chip"
        fluid
      />
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
  options: any[] | undefined;
  optionLabel?: string;
  optionValue?: string;
  placeholder?: string;
}>();

const form = inject<any>("formContext");
const fieldState = computed(() => form?.[props.name]);
</script>
