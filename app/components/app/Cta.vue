<template>
  <section
    class="card-base container-spacing container overflow-hidden p-0 md:flex md:rounded-md"
    :class="
      variant === 'primary'
        ? 'bg-primary-400 text-white'
        : 'bg-gray-100 text-gray-800'
    "
  >
    <div
      class="flex w-full flex-col-reverse gap-4 p-8 md:flex-row md:items-center md:justify-between lg:gap-6 lg:p-12 xl:gap-20"
    >
      <div class="flex flex-col gap-4">
        <NuxtImg
          class="hidden brightness-0 invert-100 md:block"
          src="/logo.png"
          width="80"
          height="63"
          alt="logo"
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

      <div v-if="icon || gif">
        <Icon
          v-if="icon"
          :name="icon"
          class="text-8xl"
          :class="variant === 'primary' ? 'text-gray-200' : 'text-gray-600'"
        />
        <NuxtImg
          v-if="gif"
          :src="gif"
          loading="lazy"
          width="300"
          height="300"
          class="size-28 object-cover lg:size-40"
        />
      </div>
    </div>
    <div v-if="image" class="relative ml-auto hidden md:block">
      <NuxtImg
        :src="image"
        alt="image"
        class="h-full w-100 object-cover lg:w-120"
        style="clip-path: polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle: string;
  image?: string;
  icon?: string;
  gif?: string;
  showLogo?: boolean;
  variant?: "primary" | "secondary";
}>();
</script>
