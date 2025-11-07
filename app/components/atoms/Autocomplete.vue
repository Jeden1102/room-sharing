<template>
  <div>
    <FloatLabel variant="on">
      <AutoComplete
        :id="name"
        :name="name"
        :modelValue
        :suggestions
        :placeholder
        @complete="$emit('complete', $event)"
        @option-select="$emit('option-select', $event)"
        @clear="$emit('clear')"
        @update:modelValue="$emit('update:modelValue', $event)"
        fluid
      />
      <label v-if="label" :for="name">{{ label }}</label>
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
  label?: string;
  modelValue?: any;
  suggestions?: any[];
  placeholder?: string;
  form?: any;
}>();

const emit = defineEmits<{
  complete: [event: any];
  "option-select": [event: any];
  clear: any;
  "update:modelValue": [value: any];
}>();

const fieldState = computed(() => props.form?.[props.name]);
</script>
