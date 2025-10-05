<template>
  <div>
    <h1 class="text-3xl font-semibold">New account</h1>
    <p class="mt-2 mb-6 font-light">
      Hi! Create an account and start your journey
    </p>
    <AuthRegister />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "login",
  unauthenticatedOnly: true,
});

usePageSeo({
  title: "Register",
  description: "Register to your account",
});
</script>
