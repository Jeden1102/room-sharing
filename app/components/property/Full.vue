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
            <span v-if="property.buildingNumber" class="pl-1">
              {{ property.buildingNumber }}
            </span>
          </p>
        </div>
        <div class="text-3xl font-bold whitespace-nowrap md:text-4xl">
          {{ formatPrice(property.price) }} zł
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
            @click="showImage(property.mainImageIdx)"
          >
            <img
              :src="property.images[property.mainImageIdx]"
              :alt="property.title"
              class="h-64 w-full rounded-lg object-cover lg:h-full"
            />
          </div>

          <div class="col-span-1 cursor-pointer" @click="showImage(1)">
            <img
              :src="property.images[1] || property.images[0]"
              :alt="property.title"
              class="h-40 w-full rounded-lg object-cover"
            />
          </div>

          <div class="relative col-span-1 cursor-pointer" @click="showImage(2)">
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

        <div class="card-base">
          <h2 class="mb-4 text-2xl font-bold text-gray-900">Description</h2>
          <div class="leading-relaxed whitespace-pre-line text-gray-700">
            {{ property.description }}
          </div>
        </div>

        <!-- Property Details -->
        <div class="card-base">
          <h2 class="mb-6 text-2xl font-bold text-gray-900">
            Property details
          </h2>
          <div class="grid gap-6 md:grid-cols-2">
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
        </div>

        <!-- Amenities -->
        <div class="card-base">
          <h2 class="mb-6 text-2xl font-bold text-gray-900">Amenities</h2>
          <div class="grid gap-4 md:grid-cols-2">
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
        </div>
      </div>

      <div class="lg:col-span-1">
        <div class="bg-primary-600 sticky top-6 rounded-lg p-6 text-white">
          <h3 class="mb-6 text-xl font-bold">Contact agent</h3>

          <div class="mb-6 flex items-center gap-4">
            <img
              :src="property.owner.profileImage || '/default-avatar.png'"
              :alt="`${property.owner.firstName} ${property.owner.lastName}`"
              class="h-16 w-16 rounded-full object-cover"
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
            <a
              :href="`tel:${property.phone}`"
              class="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 font-medium text-gray-900 transition hover:bg-gray-100"
            >
              <svg
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Call
            </a>

            <a
              :href="`mailto:${property.email}`"
              class="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-white px-4 py-3 font-medium text-white transition hover:bg-white hover:text-gray-900"
            >
              <svg
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email
            </a>
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
    @hide="onHide"
  />
</template>

<script setup lang="ts">
import { PropertyDetail } from "#components";
import VueEasyLightbox from "vue-easy-lightbox";

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
</script>

<style scoped></style>
