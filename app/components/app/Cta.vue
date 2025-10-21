<template>
  <section
    class="card-base container mb-10 p-0 max-md:max-w-11/12 md:mb-20 md:flex md:rounded-md"
    :class="
      variant === 'primary'
        ? 'bg-primary-400 text-white'
        : 'bg-gray-100 text-gray-800'
    "
  >
    <div class="flex flex-col gap-4 p-8 lg:gap-6 lg:p-12">
      <NuxtImg
        class="brightness-0 invert-100"
        src="/logo.svg"
        alt="logo"
        width="162"
        height="32"
        v-if="showLogo"
      />
      <h2 class="text-2xl font-medium lg:text-3xl">
        {{ title }}
      </h2>
      <p
        class="font-light"
        :class="variant === 'primary' ? 'text-gray-200' : 'text-gray-600'"
      >
        {{ subtitle }}
      </p>
      <div class="mt-4 flex gap-4 lg:mt-6">
        <slot />
      </div>
    </div>
    <NuxtImg
      v-if="image"
      :src="image"
      alt="image"
      class="ml-auto hidden w-100 rounded-r-md object-cover md:block lg:w-120"
    />
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle: string;
  image?: string;
  showLogo?: boolean;
  variant?: "primary" | "secondary";
}>();
</script>
