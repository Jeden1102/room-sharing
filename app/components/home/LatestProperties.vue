<template>
  <section class="container">
    <AppSectionTitle
      title="Latest Properties"
      subtitle="Discover our latest properties"
    />
    <Carousel
      :value="products"
      :numVisible="3"
      :numScroll="1"
      :gap="20"
      :responsiveOptions="responsiveOptions"
      contentClass="[&>.p-carousel-viewport]:py-4 [&_.p-button-rounded]:!hidden lg:[&_.p-button-rounded]:!block"
    >
      <template #item="slotProps">
        <PropertyTeaser
          :images="slotProps.data.images"
          :imageAlt="slotProps.data.name"
          :badge1Value="slotProps.data.badge1Value"
          :badge2Value="slotProps.data.badge2Value"
          :name="slotProps.data.name"
          :location="slotProps.data.location"
          :area="slotProps.data.area"
          :occupants="slotProps.data.occupants"
          :rooms="slotProps.data.rooms"
          :price="slotProps.data.price"
          class="mx-2"
        />
      </template>
    </Carousel>
  </section>
</template>

<script setup lang="ts">
import type { Teaser } from "~/components/property/types";
import { properties } from "~/data/properties";

const products = ref<Teaser[]>(properties);

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
