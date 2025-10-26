<template>
  <div>
    <FloatLabel variant="on">
      <Dropdown
        :id="name"
        :name
        :options
        :optionLabel
        :optionValue
        :label
        fluid
        v-model="model"
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
  options: any[];
  optionLabel?: string;
  optionValue?: string;
  form?: any;
}>();

const model = defineModel();

const form = inject<any>("formContext");
const fieldState = computed(() => props.form?.[props.name]);
</script>
