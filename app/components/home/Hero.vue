<template>
  <section
    class="container flex flex-col gap-12 py-10 md:flex-row md:justify-between md:gap-20 md:py-30 lg:items-center lg:gap-30"
  >
    <div class="flex flex-col gap-4">
      <ClientOnly>
        <BitsAnimatedContent :delay="0.2">
          <p class="font-light lg:text-xl">
            More than 10M+ house avaiable for sell & rent
          </p>
        </BitsAnimatedContent>
      </ClientOnly>

      <ClientOnly>
        <BitsAnimatedContent :delay="0.4">
          <h1
            class="mb-4 text-3xl font-bold uppercase md:max-w-150 md:text-4xl lg:text-6xl"
          >
            Find your next perfect <span class="text-primary-400">place</span>
          </h1>
        </BitsAnimatedContent>
      </ClientOnly>
      <ClientOnly>
        <BitsAnimatedContent :delay="0.6">
          <Button asChild v-slot="slotProps">
            <RouterLink to="/properties" :class="slotProps.class" class="w-fit">
              Explore properties
            </RouterLink>
          </Button>
        </BitsAnimatedContent>
      </ClientOnly>
      <div class="ml-auto hidden size-50 lg:block">
        <ClientOnly>
          <BitsAnimatedContent :scale="0" :delay="0.8">
            <BitsCircularText
              text="FOR RENT * FOR SALE * FOR SHARE * "
              :spin-duration="20"
              on-hover="speedUp"
            />
          </BitsAnimatedContent>
        </ClientOnly>
      </div>
    </div>
    <ClientOnly>
      <BitsAnimatedContent :delay="0.6">
        <NuxtImg
          src="http://localhost:3000/hero.png"
          alt="hero"
          class="rounded-lg"
          width="516"
          height="530"
        />
      </BitsAnimatedContent>
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
import { ClientOnly } from "#components";
</script>

<style scoped></style>
