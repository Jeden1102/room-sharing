<template>
  <ClientOnly>
    <section class="container mb-30">
      <AppSectionTitle :title :subtitle />
      <Carousel
        :value="items"
        :numVisible="3"
        :numScroll="1"
        :gap="20"
        :responsiveOptions="responsiveOptions"
        :showNavigators="showNavigation"
        :showIndicators="showNavigation"
        contentClass="[&>.p-carousel-viewport]:py-4 [&_.p-button-rounded]:!hidden lg:[&_.p-button-rounded]:!block"
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
import { UserTeaser } from "#components";

const { showNavigation = true } = defineProps<{
  title: string;
  subtitle: string;
  items: any[];
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
    showIndicators: false,
  },
]);
</script>
