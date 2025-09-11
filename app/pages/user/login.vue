<template>
  <div class="flex flex-col gap-4 py-10 md:container md:flex-row">
    <div class="mx:px-0 px-4">
      <h1 class="text-3xl font-semibold">Welcome back</h1>
      <p class="mt-2 mb-6 font-light">
        Good to see you again. Please enter your details
      </p>
      <AuthLogin />
    </div>
    <div class="h-screen md:absolute md:top-0 md:right-0 md:w-[50vw]">
      <BitsBackgroundsAurora
        :color-stops="['#b3d1f2', '#80afe6', '#00509d']"
        :amplitude="1.0"
        :blend="1.5"
        :speed="1.0"
        :intensity="1"
        class="h-full w-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "simple",
});
</script>
