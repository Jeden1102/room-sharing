<template>
  <div>
    <h1 class="text-3xl font-semibold">Forgot password</h1>
    <p class="mt-2 mb-6 font-light">Enter your email to reset your password</p>
    <AuthForgotPassword />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "login",
  unauthenticatedOnly: true,
});
</script>
