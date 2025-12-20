<template>
  <section
    class="container flex min-h-[60vh] flex-col items-center gap-12 py-10 md:flex-row md:justify-between md:gap-20 md:py-24 lg:min-h-[65vh] lg:gap-30"
  >
    <div class="flex flex-col gap-4">
      <p class="font-light lg:text-xl">
        {{ $t("hero.subtitle") }}
      </p>

      <h1
        class="mb-4 text-3xl font-semibold uppercase md:max-w-150 md:text-4xl lg:text-6xl"
      >
        {{ $t("hero.title") }}
        <span class="text-primary-400">{{ $t("hero.titleHighlight") }}</span>
      </h1>
      <div class="flex gap-4">
        <Button asChild v-slot="slotProps">
          <RouterLink
            :to="$localePath('properties-filters')"
            :class="slotProps.class"
            class="w-fit"
          >
            {{ $t("hero.cta") }}
          </RouterLink>
        </Button>

        <Button asChild v-slot="slotProps" severity="secondary">
          <RouterLink
            :to="$localePath('users-filters')"
            :class="slotProps.class"
            class="w-fit"
          >
            {{ $t("hero.ctaSecondary") }}
          </RouterLink>
        </Button>
      </div>
    </div>
    <NuxtImg
      src="/images/hero.webp"
      :alt="$t('hero.imageAlt')"
      class="image-mask rounded-lg"
      width="516"
      height="530"
      format="webp"
      sizes="100vw sm:516px"
      fetchpriority="high"
      loading="eager"
    />
  </section>
</template>
