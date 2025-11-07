<template>
  <div
    class="flex flex-col gap-4 overflow-hidden rounded-2xl shadow-md"
    v-if="property"
  >
    <div class="relative">
      <Carousel
        :value="
          property.images.length > 0
            ? property.images.slice(0, 5)
            : ['/images/user/bg-placeholder.webp']
        "
        :numVisible="1"
        :numScroll="1"
        :showNavigators="false"
        :showIndicators="property.images.length > 1"
        :circular="true"
        class="[&_.p-carousel-indicator-list]:absolute [&_.p-carousel-indicator-list]:bottom-0 [&_.p-carousel-indicator-list]:left-1/2 [&_.p-carousel-indicator-list]:w-full [&_.p-carousel-indicator-list]:-translate-x-1/2"
      >
        <template #item="slotProps">
          <img
            :src="slotProps.data"
            alt="Property image"
            class="h-48 w-full object-cover"
          />
        </template>
      </Carousel>
      <Badge
        :value="property.type"
        severity="secondary"
        class="absolute top-2 left-2"
      />
      <Badge :value="property.listingType" class="absolute top-10 left-2" />

      <Button
        class="!absolute top-2 right-2"
        rounded
        severity="secondary"
        icon="pi pi-bookmark"
      >
        <span class="pi pi-bookmark"></span>
      </Button>
    </div>

    <div class="mt-auto space-y-3 p-4 pt-0">
      <div>
        <h3 class="text-lg font-semibold">{{ property.title }}</h3>
        <p class="flex items-center text-sm text-gray-500">
          {{ property.city }}
        </p>
      </div>

      <div class="mb-6 flex items-center gap-6 text-sm text-gray-600">
        <span class="flex items-center gap-1">
          <i class="pi pi-window-minimize"></i> {{ property.sizeM2 }} m²
        </span>
        <span class="flex items-center gap-1">
          <i class="pi pi-box"></i> {{ property.rooms }} pokoje
        </span>
        <span class="flex items-center gap-1">
          <i class="pi pi-home"></i> {{ property.floor }} piętro
        </span>
      </div>
      <Divider />
      <div class="mt-6 flex items-center justify-between gap-4">
        <div class="text-primary-400 text-2xl font-semibold">
          ${{ formatPrice(property.price) }}
        </div>
        <Button asChild v-slot="slotProps">
          <RouterLink
            :to="
              $localePath({
                name: 'properties-id',
                params: {
                  id: slugify(property.title),
                },
                query: { id: property.id },
              })
            "
            :class="slotProps.class"
            >View details</RouterLink
          >
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ property: any }>();
</script>
