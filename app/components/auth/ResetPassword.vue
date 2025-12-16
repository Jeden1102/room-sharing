<template>
  <div class="card flex flex-col items-center gap-5">
    <Form
      v-slot="$form"
      :resolver="resolver"
      @submit="onFormSubmit"
      class="flex w-full flex-col gap-4"
    >
      <div class="flex flex-col gap-1">
        <AtomsInput
          name="password"
          :label="$t('resetPassword.password.placeholder')"
          :form="$form"
          type="password"
        />
      </div>
      <div class="flex flex-col gap-1">
        <AtomsInput
          name="passwordRepeat"
          :label="$t('resetPassword.passwordRepeat.placeholder')"
          :form="$form"
          type="password"
        />
      </div>
      <Button
        type="submit"
        :label="$t('resetPassword.button.submit')"
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

const { t } = useI18n();

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
  values: {
    password?: string;
    passwordRepeat?: string;
  };
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
    formStatus.value.message = t(res.message);
  } catch (error: any) {
    formStatus.value.success = false;
    formStatus.value.message = t(error.data.message);
  } finally {
    formStatus.value.isLoading = false;
  }
};
</script>
