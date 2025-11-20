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
          />
          <div class="text-3xl font-bold whitespace-nowrap md:text-4xl">
            {{ formatPrice(property.price) }} zł
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="container mx-auto max-w-6xl px-4 py-8">
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Left Column - Images and Content -->
      <div class="space-y-6 lg:col-span-2">
        <!-- Main Image Gallery -->
        <div class="grid grid-cols-2 gap-4">
          <!-- Main Image - Full width on mobile, 2 rows on desktop -->
          <div
            class="col-span-2 row-span-1 cursor-pointer lg:row-span-2"
            :class="property.images.length === 0 && 'pointer-events-none'"
            @click="showImage(property.mainImageIdx)"
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
            @click="showImage(1)"
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
            @click="showImage(2)"
            v-if="property.images.length > 2"
          >
            <div
              class="absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center rounded-lg bg-black/70 text-white transition"
              @click.stop="showAllImages"
            >
              <i class="pi pi-camera" style="font-size: 2rem"></i>
              <span class="font-semibold">Show all</span>
              <span class="text-sm">{{ property.images.length }} photos</span>
            </div>
            <img
              :src="property.images[2] || property.images[0]"
              :alt="property.title"
              class="h-40 w-full rounded-lg object-cover"
            />
          </div>
        </div>

        <AppCard title="Description" v-if="property.description">
          <div class="leading-relaxed whitespace-pre-line text-gray-700">
            {{ property.description }}
          </div>
        </AppCard>

        <AppCard title="Property details">
          <div class="mt-8 grid gap-6 md:grid-cols-2">
            <PropertyDetail
              icon="qlementine-icons:resize-bigger-16"
              label="Total area"
              :value="property.sizeM2 + ' m2'"
            />

            <PropertyDetail
              icon="tabler:arrows-up-down"
              label="Elevator"
              :value="property.elevator ? 'Yes' : 'No'"
            />

            <PropertyDetail
              icon="material-symbols-light:bedroom-parent-outline-sharp"
              label="Rooms"
              :value="property.rooms"
            />

            <PropertyDetail
              icon="material-symbols-light:local-parking"
              label="Parking"
              :value="property.parking ? 'Yes' : 'No'"
            />

            <PropertyDetail
              icon="material-symbols:floor-rounded"
              label="Floor"
              :value="property.floor"
            />

            <PropertyDetail
              icon="material-symbols:calendar-check-outline-sharp"
              label="Year built"
              :value="property.yearBuilt"
            />
          </div>
        </AppCard>

        <AppCard title="Amenities" v-if="hasAnyAmenities">
          <div class="mt-8 grid gap-4 md:grid-cols-2">
            <PropertyAmenity v-if="property.furnished" label="Furnished" />
            <PropertyAmenity v-if="property.balcony" label="Balcony" />
            <PropertyAmenity v-if="property.internet" label="Internet" />
            <PropertyAmenity v-if="property.tv" label="TV" />
            <PropertyAmenity
              v-if="property.washingMachine"
              label="Washing Machine"
            />
            <PropertyAmenity v-if="property.dishwasher" label="Dishwasher" />
            <PropertyAmenity
              v-if="property.airConditioning"
              label="Air Conditioning"
            />
          </div>
        </AppCard>
      </div>

      <div class="lg:col-span-1">
        <div class="sticky top-4 flex flex-col gap-4">
          <div
            class="h-full overflow-hidden rounded-lg"
            v-if="property.latitude && property.longitude"
          >
            <PropertyMap :lat="property.latitude" :lng="property.longitude" />
          </div>
          <div class="bg-primary-600 rounded-lg p-6 text-white">
            <h3 class="mb-6 text-xl font-bold">Contact</h3>

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
                <div class="text-sm text-gray-300">{{ property.phone }}</div>
                <div class="text-sm text-gray-300">{{ property.email }}</div>
              </div>
            </div>

            <div class="space-y-3">
              <Button asChild v-slot="slotProps" severity="secondary">
                <a
                  :href="`tel:${property.phone}`"
                  :class="slotProps.class"
                  class="w-full"
                >
                  Call
                </a>
              </Button>

              <Button
                asChild
                v-slot="slotProps"
                severity="info"
                variant="outline"
              >
                <a
                  :href="`mailto:${property.email}`"
                  :class="slotProps.class"
                  class="w-full"
                >
                  Send Email
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Lightbox -->
  <vue-easy-lightbox
    :visible="visibleRef"
    :imgs="property.images"
    :index="indexRef"
    :rotateDisabled="true"
    :zoomDisabled="true"
    :pinchDisabled="true"
    @hide="onHide"
  />

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
          name: 'properties-id-edit',
          params: {
            id: slugify(property.title),
          },
          query: { id: property.id },
        })
      "
    >
      Edit Property
    </RouterLink>
  </Button>
</template>

<script setup lang="ts">
import VueEasyLightbox from "vue-easy-lightbox";

const { data } = useAuth();
const props = defineProps<{ property: any }>();

const visibleRef = ref(false);
const indexRef = ref(0);

const showImage = (index: number) => {
  indexRef.value = index;
  visibleRef.value = true;
};

const showAllImages = () => {
  indexRef.value = 0;
  visibleRef.value = true;
};

const onHide = () => {
  visibleRef.value = false;
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
.vel-modal {
  z-index: 99999;
}
</style>
