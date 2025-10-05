<script setup lang="ts">
import type { NuxtError } from "#app";

usePageSeo({
  title: "Error",
  description: "Something went wrong",
});

definePageMeta({
  auth: false,
});

const props = defineProps({ error: Object as () => NuxtError });

const handleError = () => clearError({ redirect: "/" });

const errorMessages: Record<number, string> = {
  403: "Whoops! You don't have permission to access this page",
  404: "Whoops! The page you are looking for does not exist",
};

const errorImages: Record<number, string> = {
  403: "/icons/403.svg",
  404: "/icons/404.svg",
};

const message = computed(() => {
  return (
    errorMessages[props.error?.statusCode ?? 0] ||
    "Whoops! Something went wrong"
  );
});

const image = computed(() => {
  return errorImages[props.error?.statusCode ?? 0] || "/icons/error.svg";
});
</script>

<template>
  <NuxtLayout>
    <div
      class="container flex flex-col items-center gap-6 py-10 text-center md:gap-10"
    >
      <img :src="image" alt="Error image" class="max-w-sm" />

      <h2 class="text-3xl font-bold uppercase md:text-4xl lg:text-6xl">
        {{ props.error?.statusCode }}
      </h2>

      <p class="text-lg text-gray-600 md:text-xl">
        {{ message }}
      </p>

      <Button class="w-fit" @click="handleError">Go home</Button>
    </div>
  </NuxtLayout>
</template>
