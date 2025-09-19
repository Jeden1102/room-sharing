<template>
  <div>
    <h1 class="text-3xl font-semibold">Welcome back</h1>
    <p class="mt-2 mb-6 font-light">
      Good to see you again. Please enter your details
    </p>
    <AuthLogin />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "login",
  unauthenticatedOnly: true,
});
</script>
