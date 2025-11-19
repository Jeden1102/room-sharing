<template>
  <ClientOnly>
    <section class="container mb-30">
      <AppSectionTitle :title :subtitle />
      <Carousel
        :value="properties"
        :numVisible="3"
        :numScroll="1"
        :gap="20"
        :responsiveOptions="responsiveOptions"
        contentClass="[&>.p-carousel-viewport]:py-4 [&_.p-button-rounded]:!hidden lg:[&_.p-button-rounded]:!block"
      >
        <template #item="slotProps">
          <PropertyTeaser
            :property="slotProps.data"
            class="mx-2"
            :no-carousel="true"
            variant="large"
          />
        </template>
      </Carousel>
    </section>
  </ClientOnly>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle: string;
  properties: any[];
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
    showIndicators: false,
  },
]);
</script>
