<template>
  <div>
    <FloatLabel variant="on">
      <Password
        :id="id"
        :name
        fluid
        :type
        v-if="type === 'password'"
        :feedback="false"
        toggleMask
      />
      <InputText :id="id" :name fluid :type v-else />
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
  form: Record<string, FieldState>;
  type?: "text" | "email" | "password" | "hidden";
}>();

const id = useId();

const fieldState = computed(() => props.form?.[props.name]);
</script>
