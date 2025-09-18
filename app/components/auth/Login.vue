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
      <NuxtLink
        :to="$localePath('/user/forgot-password')"
        class="text-primary-600 text-sm font-semibold"
      >
        Forgot Password?
      </NuxtLink>
      <Button type="submit" label="Login" :loading="formStatus.isLoading" />
      <Message
        class="w-full"
        :severity="formStatus.success ? 'info' : 'error'"
        v-if="formStatus.message"
        >{{ formStatus.message }}</Message
      >
      <div class="mt-4 flex flex-col gap-4">
        <Button severity="secondary" @click="signIn('google')">
          <i class="pi pi-google"></i> Login with Google
        </Button>
        <span>
          Don't have an account?
          <NuxtLink
            :to="$localePath('/user/register')"
            class="text-primary-600 font-semibold"
          >
            Register
          </NuxtLink>
        </span>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";

const { signIn } = useAuth();

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
  password: "",
});

const resolver = ref(
  zodResolver(
    z.object({
      email: z.string().email({ message: "Invalid email address" }),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
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
  if (!valid) return;
  formStatus.value.isLoading = true;
  const result = await signIn("credentials", {
    ...values,
    redirect: false,
  });
  formStatus.value.isLoading = false;

  if (result?.error) {
    formStatus.value.success = false;
    formStatus.value.message = result.error;
  } else {
    useRouter().push("/user/profile");
  }
};
</script>
