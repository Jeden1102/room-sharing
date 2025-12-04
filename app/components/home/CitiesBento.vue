<template>
  <section class="container mb-30">
    <AppSectionTitle
      :title="$t('cities.title')"
      :subtitle="$t('cities.subtitle')"
    />
    <div class="mt-10 flex flex-wrap gap-6">
      <RouterLink
        v-for="city in cities"
        :key="city.nameKey"
        :title="$t(city.nameKey)"
        :to="city.link"
        :class="city.class"
        class="flex h-56 w-full md:h-72 lg:h-90"
      >
        <BitsFadeContent
          :blur="true"
          :duration="1000"
          :delay="200"
          :threshold="0.1"
          :initial-opacity="0"
          easing="ease-out"
          class-name="group relative block size-full overflow-hidden rounded-xl shadow-md"
        >
          <NuxtImg
            :src="city.image"
            :alt="`${$t(city.nameKey)} - ${$t('cities.imageAlt')}`"
            format="webp"
            class="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            sizes="100vw md:875px"
          />
          <div
            class="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/50"
          ></div>
          <h3 class="absolute bottom-4 left-4 text-lg text-white">
            {{ $t(city.nameKey) }}
          </h3>
        </BitsFadeContent>
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath();

const cities = [
  {
    nameKey: "cities.list.warszawa",
    image: "/images/warszawa.jpg",
    link: localePath({
      name: "properties",
      query: { city: "Warszawa" },
    }),
    class: "md:w-[calc(30%-12px)]",
  },
  {
    nameKey: "cities.list.krakow",
    image: "/images/krakow.jpg",
    link: localePath({
      name: "properties",
      query: { city: "Kraków" },
    }),
    class: "md:w-[calc(70%-12px)]",
  },
  {
    nameKey: "cities.list.gdansk",
    image: "/images/gdansk.jpg",
    link: localePath({
      name: "properties",
      query: { city: "Gdańsk" },
    }),
    class: "md:w-[calc(55%-12px)]",
  },
  {
    nameKey: "cities.list.wroclaw",
    image: "/images/wroclaw.jpg",
    link: localePath({
      name: "properties",
      query: { city: "Wrocław" },
    }),
    class: "md:w-[calc(45%-12px)]",
  },
];
</script>
