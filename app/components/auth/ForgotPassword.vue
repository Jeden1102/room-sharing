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
        <AtomsInput
          name="email"
          :label="$t('forgotPassword.email.placeholder')"
          :form="$form"
          type="email"
        />
      </div>
      <Button
        class="w-fit"
        type="submit"
        :label="$t('forgotPassword.button.sendResetLink')"
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
import { forgotPasswordSchema } from "~/schemas/auth";

const formStatus = ref<{
  success: boolean | null;
  message: string;
  isLoading: boolean;
}>({
  success: null,
  message: "",
  isLoading: false,
});

const { t } = useI18n();

const initialValues = ref({
  email: "",
});

const resolver = ref(zodResolver(forgotPasswordSchema));

const onFormSubmit = async ({
  valid,
  values,
  reset,
}: {
  valid: boolean;
  values: {
    email?: string;
  };
  reset: () => void;
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
    reset();
    formStatus.value.success = true;
    formStatus.value.message = t(res.message);
  } catch (error: any) {
    formStatus.value.success = false;
    formStatus.value.message = t(error.data.statusMessage);
  } finally {
    formStatus.value.isLoading = false;
  }
};
</script>
