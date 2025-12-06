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

      <Button class="w-fit" @click="handleError">{{
        $t("error.goHome")
      }}</Button>
    </div>
  </NuxtLayout>
</template>

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

const { t } = useI18n();

const errorMessages: Record<number, string> = {
  403: t("error.403"),
  404: t("error.404"),
};

const errorImages: Record<number, string> = {
  403: "/icons/403.svg",
  404: "/icons/404.svg",
};

const message = computed(() => {
  return errorMessages[props.error?.statusCode ?? 0] || t("error.404");
});

const image = computed(() => {
  return errorImages[props.error?.statusCode ?? 0] || "/icons/error.svg";
});
</script>
