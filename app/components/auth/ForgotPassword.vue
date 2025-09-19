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
        <InputText name="email" type="email" placeholder="Email" fluid />
        <Message
          v-if="$form.email?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.email.error.message }}</Message
        >
      </div>
      <Button
        class="w-fit"
        type="submit"
        label="Send reset link"
        :loading="formStatus.isLoading"
      />
      <Message
        class="w-full"
        :severity="formStatus.success ? 'info' : 'error'"
        v-if="formStatus.message"
        >{{ formStatus.message }}</Message
      >
    </Form>
  </div>
</template>

<script setup lang="ts">
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";

const formStatus = ref<{
  success: boolean | null;
  message: string;
  isLoading: boolean;
}>({
  success: null,
  message: "",
  isLoading: false,
});

const initialValues = ref({
  email: "",
});

const resolver = ref(
  zodResolver(
    z.object({
      email: z.string().email({ message: "Invalid email address" }),
    }),
  ),
);

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
    const res: { message: string } = await $fetch("/api/auth/forgot-password", {
      method: "POST",
      body: {
        email: values.email,
      },
    });
    formStatus.value.success = true;
    formStatus.value.message = res.message;
  } catch (error: any) {
    formStatus.value.success = false;
    formStatus.value.message = error.data.statusMessage;
  } finally {
    formStatus.value.isLoading = false;
  }
};
</script>
