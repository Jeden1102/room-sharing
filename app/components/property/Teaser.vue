<template>
  <div
    class="flex h-full flex-col gap-2 overflow-hidden rounded-2xl bg-white shadow-md"
    v-if="property"
  >
    <div class="relative">
      <img
        v-if="noCarousel"
        :src="carouselImages[0]"
        :alt="$t('propertyTeaser.imageAlt')"
        class="h-48 w-full object-cover"
      />
      <Carousel
        v-else
        :value="carouselImages"
        :numVisible="1"
        :numScroll="1"
        :showNavigators="false"
        :showIndicators="carouselImages.length > 1"
        :circular="true"
        class="carousel-pagination"
      >
        <template #item="slotProps">
          <img
            :src="slotProps.data"
            :alt="$t('propertyTeaser.imageAlt')"
            class="h-48 w-full object-cover"
          />
        </template>
      </Carousel>

      <!-- Badges + Bookmark -->
      <Badge
        :value="property.listingType"
        class="absolute top-4 left-4"
        v-if="variant === 'large'"
      />
      <AppEntityBookmark
        v-if="variant === 'large' && property.ownerId !== data?.user?.id"
        entity-type="property"
        :entity-id="property.id"
        :initial-bookmarked="property.isBookmarked"
        button-class="!absolute top-2 right-2 siema"
      />
    </div>

    <!-- Content -->
    <div class="mt-auto space-y-3 p-4 pt-0">
      <div>
        <h3 class="line-clamp-1 text-lg font-semibold">{{ property.title }}</h3>
        <p class="flex items-center text-sm text-gray-500">
          {{ property.city }}
        </p>
      </div>

      <div
        class="mb-6 flex items-center gap-6 text-sm text-gray-600"
        v-if="variant === 'large'"
      >
        <span class="flex items-center gap-1">
          <i class="pi pi-window-minimize"></i> {{ property.sizeM2 }}
          {{ $t("propertyTeaser.units.squareMeters") }}
        </span>
        <span class="flex items-center gap-1">
          <i class="pi pi-box"></i> {{ property.rooms }}
          {{ $t("propertyTeaser.units.rooms") }}
        </span>
        <span class="flex items-center gap-1">
          <i class="pi pi-home"></i> {{ property.floor }}
          {{ $t("propertyTeaser.units.floor") }}
        </span>
      </div>

      <Divider v-if="variant === 'large'" />

      <div class="mt-6 flex items-center justify-between gap-4">
        <div class="text-primary-400 text-2xl font-semibold">
          {{ formatPrice(property.price) }} {{ $t("propertyTeaser.currency") }}
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
            >{{ $t("propertyTeaser.viewDetails") }}</RouterLink
          >
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropertyWithOwner } from "@/components/property/types";
const { data } = useAuth();
const props = defineProps<{
  property: PropertyWithOwner;
  noCarousel?: boolean;
  variant?: "small" | "large";
}>();

const carouselImages = computed(() => {
  const imgs = props.property?.images || [];
  if (!imgs.length) {
    return ["/images/user/bg-placeholder.webp"];
  }

  const mainIdx = props.property.mainImageIdx ?? 0;
  const main = imgs[mainIdx];
  const rest = imgs.filter((_: unknown, i: number) => i !== mainIdx);

  return [main, ...rest].slice(0, 5);
});
</script>
