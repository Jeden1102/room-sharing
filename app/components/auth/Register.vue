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
          name="email"
          :label="$t('register.email.placeholder')"
          :form="$form"
          type="email"
        />
      </div>
      <div class="flex flex-col gap-1">
        <AtomsInput
          name="password"
          :label="$t('register.password.placeholder')"
          :form="$form"
          type="password"
        />
      </div>
      <div class="flex flex-col gap-1">
        <AtomsInput
          name="passwordRepeat"
          :label="$t('register.passwordRepeat.placeholder')"
          :form="$form"
          type="password"
        />
      </div>
      <FormTerms />
      <Button
        type="submit"
        :label="$t('register.button.submit')"
        :loading="formStatus.isLoading"
      />
      <Message
        :severity="formStatus.success ? 'info' : 'error'"
        v-if="formStatus.message"
        class="max-w-100"
        >{{ formStatus.message }}</Message
      >

      <Divider />
      <Button severity="secondary" @click="signIn('google')">
        <i class="pi pi-google"></i> {{ $t("register.button.google") }}
      </Button>
      <div class="mt-4 flex flex-col gap-4">
        <span>
          {{ $t("register.hasAccount") }}
          <NuxtLink
            :to="$localePath('auth-login')"
            class="text-primary-600 font-semibold"
          >
            {{ $t("register.loginLink") }}
          </NuxtLink>
        </span>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { registerSchema } from "~/schemas/auth";

const { t } = useI18n();

const { signIn } = useAuth();

definePageMeta({
  unauthenticatedOnly: true,
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

const resolver = ref(zodResolver(registerSchema));

const onFormSubmit = async ({
  valid,
  values,
  reset,
}: {
  valid: boolean;
  values: {
    email?: string;
    password?: string;
    passwordRepeat?: string;
  };
  reset: () => void;
}) => {
  if (!valid) {
    return;
  }
  try {
    formStatus.value.isLoading = true;
    const res: { statusMessage: string } = await $fetch("/api/auth/register", {
      method: "POST",
      body: {
        email: values.email,
        password: values.password,
        passwordRepeat: values.passwordRepeat,
      },
    });
    formStatus.value.success = true;
    formStatus.value.message = t(res.statusMessage);
    reset();
  } catch (error: any) {
    formStatus.value.success = false;
    formStatus.value.message = t(error.data.statusMessage);
  } finally {
    formStatus.value.isLoading = false;
  }
};
</script>
