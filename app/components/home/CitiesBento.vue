<template>
  <section class="container mb-30">
    <AppSectionTitle
      title="What city will you live in?"
      subtitle="Discover our cities"
    />

    <div class="mt-10 flex flex-wrap gap-6">
      <RouterLink
        v-for="city in cities"
        :key="city.name"
        :to="city.link"
        class="group relative block h-56 w-full overflow-hidden rounded-xl shadow-md md:h-72 lg:h-90"
        :class="city.class"
      >
        <NuxtImg
          :src="city.image"
          :alt="city.name"
          class="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div
          class="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/50"
        ></div>
        <h3 class="absolute bottom-4 left-4 text-lg text-white">
          {{ city.name }}
        </h3>
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const cities = [
  {
    name: "Warsaw",
    image: "/images/warszawa.jpg",
    link: "/city/warsaw",
    class: "md:w-[calc(30%-12px)]",
  },
  {
    name: "Kraków",
    image: "/images/krakow.jpg",
    link: "/city/krakow",
    class: "md:w-[calc(70%-12px)]",
  },
  {
    name: "Gdańsk",
    image: "/images/gdansk.jpg",
    link: "/city/gdansk",
    class: "md:w-[calc(55%-12px)]",
  },
  {
    name: "Wrocław",
    image: "/images/wroclaw.jpg",
    link: "/city/wroclaw",
    class: "md:w-[calc(45%-12px)]",
  },
];
</script>
