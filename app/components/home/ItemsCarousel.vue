<template>
  <ClientOnly>
    <section class="container-spacing container">
      <AppSectionTitle :title :subtitle />
      <Carousel
        :value="items"
        :numVisible="3"
        :numScroll="1"
        :gap="20"
        :responsiveOptions="responsiveOptions"
        :showNavigators="showNavigation"
        :showIndicators="true"
        contentClass="[&>.p-carousel-viewport]:py-4 [&_.p-carousel-next-button]:!hidden [&_.p-carousel-prev-button]:!hidden lg:[&_.p-carousel-next-button]:!block lg:[&_.p-carousel-prev-button]:!block"
      >
        <template #item="slotProps">
          <PropertyTeaser
            v-if="entity === 'property'"
            :property="slotProps.data"
            class="mx-2"
            :no-carousel="true"
            variant="large"
          />
          <UserTeaser
            v-else-if="entity === 'user'"
            :user="slotProps.data"
            class="mx-2"
          />
        </template>
      </Carousel>
    </section>
  </ClientOnly>
</template>

<script setup lang="ts">
const { showNavigation = true } = defineProps<{
  title: string;
  subtitle: string;
  items: unknown[];
  showNavigation?: boolean;
  entity: "property" | "user";
}>();

const responsiveOptions = ref([
  {
    breakpoint: "993px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "992px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);
</script>

<style>
.p-carousel-indicator-list:has(.p-carousel-indicator:first-child:last-child) {
  display: none !important;
}
</style>
