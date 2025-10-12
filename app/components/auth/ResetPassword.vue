<template>
  <div class="card flex flex-col items-center gap-5">
    <Form
      v-slot="$form"
      :initialValues="initialValues"
      :resolver="resolver"
      @submit="onFormSubmit"
      class="flex w-full flex-col gap-4"
    >
      <div class="flex flex-col gap-1">
        <InputText
          name="password"
          type="password"
          placeholder="New password"
          fluid
        />
        <Message
          v-if="$form.password?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.password.error.message }}</Message
        >
      </div>
      <div class="flex flex-col gap-1">
        <InputText
          name="passwordRepeat"
          type="password"
          placeholder="Repeat new password"
          fluid
        />
        <Message
          v-if="$form.passwordRepeat?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.passwordRepeat.error.message }}</Message
        >
      </div>
      <Button
        type="submit"
        label="Reset password"
        :loading="formStatus.isLoading"
        class="w-fit"
      />
      <Message
        :severity="formStatus.success ? 'info' : 'error'"
        v-if="formStatus.message"
        class="max-w-100"
        >{{ formStatus.message }}</Message
      >
    </Form>
  </div>
</template>

<script setup lang="ts">
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { passwordResetSchema } from "~/schemas/auth";

const { code } = defineProps<{ code: string }>();

const initialValues = ref({
  password: "",
  passwordRepeat: "",
});

const formStatus = ref<{
  success: boolean | null;
  isLoading: boolean;
  message: string;
}>({
  success: null,
  isLoading: false,
  message: "",
});

const resolver = ref(zodResolver(passwordResetSchema));

const onFormSubmit = async ({
  valid,
  values,
}: {
  valid: boolean;
  values: any;
}) => {
  if (!valid) {
    return;
  }
  try {
    formStatus.value.isLoading = true;
    const res: { message: string } = await $fetch("/api/auth/reset-password", {
      method: "POST",
      body: {
        password: values.password,
        passwordRepeat: values.passwordRepeat,
        code,
      },
    });
    formStatus.value.success = true;
    formStatus.value.message = res.message;
  } catch (error: any) {
    formStatus.value.success = false;
    formStatus.value.message = error.data.message;
  } finally {
    formStatus.value.isLoading = false;
  }
};
</script>
