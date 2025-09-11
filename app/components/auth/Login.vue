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
      <Button type="submit" label="Login" />
      <div class="mt-4 flex flex-col gap-4">
        <Button asChild v-slot="slotProps" severity="secondary">
          <a :class="slotProps.class" @click="handleGoogleLogin">
            <i class="pi pi-google"></i> Login with Google
          </a>
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

<script setup>
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";

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

const onFormSubmit = ({ valid }) => {
  if (valid) {
    console.log("OK");
  }
};

const handleGoogleLogin = () => {
  // Add your Google login logic here
};
</script>
