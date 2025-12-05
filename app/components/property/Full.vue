<template>
  <div class="border-b border-gray-200 bg-white">
    <div class="container mx-auto max-w-6xl px-4 py-6">
      <div class="flex items-end justify-between">
        <div>
          <Badge>
            {{ property.listingType }}
          </Badge>
          <AppHeading class="my-2">
            {{ property.title }}
          </AppHeading>
          <p class="text-gray-600">
            <span class="flex font-semibold">
              {{ property.city }}
              <template v-if="property.district">
                {{ property.district }}
              </template>
            </span>

            <template v-if="property.street">
              {{ property.street }}
            </template>
            <span
              v-if="property.buildingNumber && property.street"
              class="pl-1"
            >
              {{ property.buildingNumber }}
            </span>
          </p>
        </div>
        <div class="flex flex-col items-end gap-8">
          <AppEntityBookmark
            entity-type="property"
            :entity-id="property.id"
            :initial-bookmarked="property.isBookmarked"
            v-if="data?.user?.id !== property.ownerId"
          />
          <div class="text-3xl font-bold whitespace-nowrap md:text-4xl">
            {{ formatPrice(property.price) }} {{ $t("propertyFull.currency") }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container mx-auto max-w-6xl px-4 py-8">
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div class="space-y-6 lg:col-span-2">
        <div class="grid grid-cols-2 gap-4">
          <div
            class="col-span-2 row-span-1 cursor-pointer lg:row-span-2"
            :class="property.images.length === 0 && 'pointer-events-none'"
            @click="openGallery(property.mainImageIdx)"
          >
            <img
              :src="
                property.images[property.mainImageIdx] ||
                '/images/user/bg-placeholder.webp'
              "
              :alt="property.title"
              class="h-64 w-full rounded-lg object-cover lg:h-100"
            />
          </div>

          <div
            class="col-span-1 cursor-pointer"
            @click="openGallery(1)"
            v-if="property.images.length > 1"
          >
            <img
              :src="property.images[1] || property.images[0]"
              :alt="property.title"
              class="h-40 w-full rounded-lg object-cover"
            />
          </div>

          <div
            class="relative col-span-1 cursor-pointer"
            @click="openGallery(2)"
            v-if="property.images.length > 2"
          >
            <div
              class="absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center rounded-lg bg-black/70 text-white transition"
              @click.stop="openGallery(0)"
            >
              <i class="pi pi-camera" style="font-size: 2rem"></i>
              <span class="font-semibold">
                {{ $t("propertyFull.gallery.showAll") }}
              </span>
              <span class="text-sm">
                {{
                  $t("propertyFull.gallery.photosCount", {
                    count: property.images.length,
                  })
                }}
              </span>
            </div>
            <img
              :src="property.images[2] || property.images[0]"
              :alt="property.title"
              class="h-40 w-full rounded-lg object-cover"
            />
          </div>
        </div>

        <AppCard
          :title="$t('propertyFull.description.title')"
          v-if="property.description"
        >
          <div class="leading-relaxed whitespace-pre-line text-gray-700">
            {{ property.description }}
          </div>
        </AppCard>

        <AppCard :title="$t('propertyFull.details.title')">
          <div class="mt-8 grid gap-6 md:grid-cols-2">
            <PropertyDetail
              icon="qlementine-icons:resize-bigger-16"
              :label="$t('propertyFull.details.totalArea')"
              :value="property.sizeM2 + ' m2'"
            />

            <PropertyDetail
              icon="tabler:arrows-up-down"
              :label="$t('propertyFull.details.elevator')"
              :value="
                property.elevator
                  ? $t('propertyFull.yes')
                  : $t('propertyFull.no')
              "
            />

            <PropertyDetail
              icon="material-symbols-light:bedroom-parent-outline-sharp"
              :label="$t('propertyFull.details.rooms')"
              :value="property.rooms"
            />

            <PropertyDetail
              icon="material-symbols-light:local-parking"
              :label="$t('propertyFull.details.parking')"
              :value="
                property.parking
                  ? $t('propertyFull.yes')
                  : $t('propertyFull.no')
              "
            />

            <PropertyDetail
              icon="material-symbols:floor-rounded"
              :label="$t('propertyFull.details.floor')"
              :value="property.floor"
            />

            <PropertyDetail
              icon="material-symbols:calendar-check-outline-sharp"
              :label="$t('propertyFull.details.yearBuilt')"
              :value="property.yearBuilt"
            />
          </div>
        </AppCard>

        <AppCard
          :title="$t('propertyFull.amenities.title')"
          v-if="hasAnyAmenities"
        >
          <div class="mt-8 grid gap-4 md:grid-cols-2">
            <PropertyAmenity
              v-if="property.furnished"
              :label="$t('propertyFull.amenities.furnished')"
            />
            <PropertyAmenity
              v-if="property.balcony"
              :label="$t('propertyFull.amenities.balcony')"
            />
            <PropertyAmenity
              v-if="property.internet"
              :label="$t('propertyFull.amenities.internet')"
            />
            <PropertyAmenity
              v-if="property.tv"
              :label="$t('propertyFull.amenities.tv')"
            />
            <PropertyAmenity
              v-if="property.washingMachine"
              :label="$t('propertyFull.amenities.washingMachine')"
            />
            <PropertyAmenity
              v-if="property.dishwasher"
              :label="$t('propertyFull.amenities.dishwasher')"
            />
            <PropertyAmenity
              v-if="property.airConditioning"
              :label="$t('propertyFull.amenities.airConditioning')"
            />
          </div>
        </AppCard>

        <Divider />

        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600">ID: {{ property.id }}</span>

          <AppEntityReport entity="property" :entity-id="property.id" />
        </div>
      </div>

      <div class="lg:col-span-1">
        <div class="sticky top-4 flex flex-col gap-4">
          <div
            class="h-full overflow-hidden rounded-lg"
            v-if="property.latitude && property.longitude"
          >
            <PropertyMap :lat="property.latitude" :lng="property.longitude" />
          </div>

          <div
            class="card-base bg-gray-100"
            v-if="property.phone || property.email"
          >
            <h3 class="mb-6 text-xl font-bold">
              {{ $t("propertyFull.contact.title") }}
            </h3>

            <div class="mb-6 flex items-center gap-4">
              <img
                :src="
                  property.owner.profileImage ||
                  '/images/user/avatar-placeholder.webp'
                "
                :alt="`${property.owner.firstName} ${property.owner.lastName}`"
                class="size-16 rounded-full object-cover"
              />
              <div>
                <div class="font-semibold">
                  {{ property.owner.firstName }} {{ property.owner.lastName }}
                </div>
                <div class="text-sm">{{ property.phone }}</div>
                <div class="text-sm">{{ property.email }}</div>
              </div>
            </div>

            <div class="space-y-3">
              <Button asChild v-slot="slotProps" v-if="property.phone">
                <a
                  :href="`tel:${property.phone}`"
                  :class="slotProps.class"
                  class="w-full"
                >
                  {{ $t("propertyFull.contact.call") }}
                </a>
              </Button>

              <Button
                v-if="property.email"
                asChild
                v-slot="slotProps"
                severity="secondary"
                variant="outline"
              >
                <a
                  :href="`mailto:${property.email}`"
                  :class="slotProps.class"
                  class="w-full"
                >
                  {{ $t("propertyFull.contact.sendEmail") }}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div ref="galleryRef" class="hidden">
    <a
      v-for="(img, i) in property.images"
      :key="i"
      :href="img"
      :data-lg-size="'1600-1066'"
    >
      <img :src="img" class="hidden" />
    </a>
  </div>

  <Button
    asChild
    v-slot="buttonProps"
    v-if="data?.user?.id === property.ownerId"
  >
    <RouterLink
      :class="buttonProps.class"
      class="!fixed right-4 bottom-20 z-10 min-w-50 md:bottom-4"
      :to="
        $localePath({
          name: 'property-id-edit',
          params: { id: slugify(property.title) },
          query: { id: property.id },
        })
      "
    >
      {{ $t("propertyFull.editButton") }}
    </RouterLink>
  </Button>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const { $lightgallery, $lgThumbnail, $lgZoom, $lgFullscreen } = useNuxtApp();

const { data } = useAuth();
const props = defineProps<{ property: any }>();

const galleryRef = ref<HTMLElement | null>(null);
let galleryInstance: any = null;

const openGallery = (index: number) => {
  if (!galleryRef.value) return;

  if (!galleryInstance) {
    galleryInstance = $lightgallery(galleryRef.value, {
      selector: "a",
      thumbnail: true,
      zoom: true,
      fullscreen: true,
      plugins: [$lgThumbnail, $lgZoom, $lgFullscreen],
      mobileSettings: {
        controls: true,
        showCloseIcon: true,
        download: false,
      },
      closable: true,
      showCloseIcon: true,
    });
  }

  galleryInstance.openGallery(index);
};

const hasAnyAmenities = computed(() => {
  return (
    props.property.balcony ||
    props.property.internet ||
    props.property.tv ||
    props.property.washingMachine ||
    props.property.dishwasher ||
    props.property.airConditioning
  );
});
</script>

<style>
@import "lightgallery/css/lightgallery.css";
@import "lightgallery/css/lg-thumbnail.css";
@import "lightgallery/css/lg-zoom.css";
@import "lightgallery/css/lg-fullscreen.css";

.vel-modal {
  z-index: 99999;
}

.lg-outer .lg-thumb-item {
  &.active {
    border-color: #00509d;
  }

  &:hover {
    border-color: #80afe6;
  }
}
</style>
