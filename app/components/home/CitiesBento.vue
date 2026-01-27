<template>
  <section class="container-spacing container">
    <AppSectionTitle
      :title="$t('cities.title')"
      :subtitle="$t('cities.subtitle')"
    />

    <div class="mt-10 flex flex-wrap gap-6">
      <div
        v-for="city in cities"
        :key="city.nameKey"
        :class="city.class"
        class="group relative h-56 w-full overflow-hidden rounded-xl shadow-md md:h-72 lg:h-90"
      >
        <NuxtImg
          :src="city.image"
          :alt="`${$t(city.nameKey)} - ${$t('cities.imageAlt')}`"
          format="webp"
          quality="70"
          class="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          sizes="100vw md:875px"
        />

        <div
          class="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/60"
        ></div>

        <div
          class="absolute inset-0 flex items-end p-6 transition-opacity duration-300 group-hover:opacity-0"
        >
          <h3 class="text-lg text-white">
            {{ $t(city.nameKey) }}
          </h3>
        </div>

        <div
          class="absolute inset-0 flex translate-y-4 flex-col items-center justify-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <p class="mb-4 text-center text-lg text-white">
            {{ $t(city.nameKey) }}
          </p>

          <div class="flex w-full max-w-60 flex-col gap-2">
            <Button
              asChild
              v-slot="slotProps"
              severity="secondary"
              v-for="category in categories"
              :key="category.slug"
            >
              <RouterLink
                :to="getCityLink(city.slug, category.slug)"
                :class="slotProps.class"
                class="capitalize"
              >
                {{ category.label }} {{ $t(city.nameKey) }}
              </RouterLink>
            </Button>

            <RouterLink
              :to="getCityLink(city.slug, 'any')"
              class="mt-2 text-center text-xs text-white/70 underline underline-offset-4 hover:text-white"
            >
              {{ $t("cities.all") }}
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();

const categories = [
  {
    label: slugify(t("taxonomies.propertyType.apartmentPlurar")),
    slug: slugify(t("taxonomies.propertyType.apartment")),
  },
  {
    label: slugify(t("taxonomies.propertyType.housePlurar")),
    slug: slugify(t("taxonomies.propertyType.house")),
  },
  {
    label: slugify(t("taxonomies.propertyType.roomPlurar")),
    slug: slugify(t("taxonomies.propertyType.room")),
  },
];

const getCityLink = (citySlug: string, typeSlug: string) => {
  return localePath({
    name: "properties-filters",
    params: {
      filters: [typeSlug, slugify(t("taxonomies.listingType.any")), citySlug],
    },
  });
};

const cities = [
  {
    nameKey: "cities.list.warszawa",
    slug: "warszawa",
    image: "/images/warszawa.jpg",
    class: "md:w-[calc(30%-12px)]",
  },
  {
    nameKey: "cities.list.krakow",
    slug: "kraków",
    image: "/images/krakow.jpg",
    class: "md:w-[calc(70%-12px)]",
  },
  {
    nameKey: "cities.list.gdansk",
    slug: "gdańsk",
    image: "/images/gdansk.jpg",
    class: "md:w-[calc(55%-12px)]",
  },
  {
    nameKey: "cities.list.wroclaw",
    slug: "wrocław",
    image: "/images/wroclaw.jpg",
    class: "md:w-[calc(45%-12px)]",
  },
];
</script>
