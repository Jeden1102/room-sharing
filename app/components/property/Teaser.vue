<template>
  <div class="overflow-hidden rounded-2xl shadow-md">
    <div class="relative">
      <Carousel
        :value="images"
        :numVisible="1"
        :numScroll="1"
        :showNavigators="false"
        :showIndicators="images.length > 1"
        :circular="true"
      >
        <template #item="slotProps">
          <img
            :src="slotProps.data.src"
            :alt="slotProps.data.alt || 'Property image'"
            class="h-48 w-full object-cover"
          />
        </template>
      </Carousel>
      <Badge
        :value="badge1Value"
        severity="secondary"
        class="absolute top-2 left-2"
      />
      <Badge :value="badge2Value" class="absolute top-10 left-2" />

      <Button
        class="!absolute top-2 right-2"
        rounded
        severity="secondary"
        icon="pi pi-bookmark"
      >
        <span class="pi pi-bookmark"></span>
      </Button>
    </div>

    <div class="space-y-3 p-4">
      <div>
        <h3 class="text-lg font-semibold">{{ name }}</h3>
        <p class="flex items-center text-sm text-gray-500">
          {{ location }}
        </p>
      </div>

      <div class="mb-6 flex items-center gap-6 text-sm text-gray-600">
        <span class="flex items-center gap-1">
          <i class="pi pi-window-minimize"></i> {{ area }} m²
        </span>
        <span class="flex items-center gap-1" v-if="occupants">
          <i class="pi pi-users"></i> {{ occupants }} lokatorów
        </span>
        <span class="flex items-center gap-1" v-if="rooms">
          <i class="pi pi-box"></i> {{ rooms }} pokoje
        </span>
        <span class="flex items-center gap-1" v-if="floor">
          <i class="pi pi-home"></i> {{ floor }} piętro
        </span>
      </div>
      <Divider />
      <div class="mt-6 flex items-center justify-between gap-4">
        <div class="text-primary-400 text-2xl font-semibold" v-if="price">
          ${{ formatPrice(price) }}
          <span class="text-xs text-gray-500">
            <span v-if="period">/ month</span></span
          >
          <span class="text-xs font-light text-gray-500" v-if="!period && price"
            >({{ (price / area).toFixed() }} zł/m²)</span
          >
        </div>
        <div class="text-primary-400 text-2xl font-semibold" v-else>
          Ask for price
        </div>
        <Button asChild v-slot="slotProps">
          <RouterLink
            :to="$localePath({ name: 'properties-id', params: { id: 123 } })"
            :class="slotProps.class"
            >View details</RouterLink
          >
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Teaser } from "./types";

const props = defineProps<Teaser>();
</script>
