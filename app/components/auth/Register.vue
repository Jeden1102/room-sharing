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
      <div class="flex flex-col gap-1">
        <InputText
          name="password"
          type="password"
          placeholder="Password"
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
          placeholder="Repeat password"
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
      <Button type="submit" label="Register" :loading="formStatus.isLoading" />
      <Message
        :severity="formStatus.success ? 'info' : 'error'"
        v-if="formStatus.message"
        class="max-w-100"
        >{{ formStatus.message }}</Message
      >
      <div class="mt-4 flex flex-col gap-4">
        <span>
          Already have an account?
          <NuxtLink
            :to="$localePath('/auth/login')"
            class="text-primary-600 font-semibold"
          >
            Login
          </NuxtLink>
        </span>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { registerSchema } from "~/schemas/auth";

definePageMeta({
  unauthenticatedOnly: true,
});

const initialValues = ref({
  email: "",
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

const resolver = ref(zodResolver(registerSchema));

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
    const res: { statusMessage: string } = await $fetch("/api/auth/register", {
      method: "POST",
      body: {
        email: values.email,
        password: values.password,
        passwordRepeat: values.passwordRepeat,
      },
    });
    formStatus.value.success = true;
    formStatus.value.message = res.statusMessage;
  } catch (error: any) {
    formStatus.value.success = false;
    formStatus.value.message = error.data.statusMessage;
  } finally {
    formStatus.value.isLoading = false;
  }
};
</script>
