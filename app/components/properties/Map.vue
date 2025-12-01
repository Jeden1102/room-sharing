<template>
  <LMap
    style="height: 80vh"
    :zoom="7"
    :center="[51.91, 19.09]"
    :use-global-leaflet="false"
  >
    <LTileLayer
      url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      layer-type="base"
      name="OpenStreetMap"
    />

    <LMarker
      v-for="marker in items"
      :key="marker.id"
      :lat-lng="[marker.latitude, marker.longitude]"
      @click="loadProperty(marker.id)"
    >
      <LIcon icon-url="/icons/marker.svg" :icon-size="[32, 32]" />
      <LPopup>
        <div v-if="propertyData && propertyData.id === marker.id">
          <PropertyTeaser :property="propertyData" class="w-72" />
        </div>
        <UserTeaserLoader v-else />
      </LPopup>
    </LMarker>
  </LMap>
</template>

<script lang="ts" setup>
import { UserTeaserLoader } from "#components";
import type { PropertyWithOwner } from "@/components/property/types";

defineProps<{
  items: { latitude: number; longitude: number; id: string }[];
}>();

const propertyData = ref<PropertyWithOwner | null>(null);

async function loadProperty(id: string) {
  propertyData.value = null;

  try {
    const { data, error } = await useFetch<{
      success: boolean;
      property: PropertyWithOwner;
    }>(`/api/property/${id}`, {
      cache: "no-cache",
    });

    if (error.value) throw error.value;
    propertyData.value = data.value?.property || null;
  } catch (err) {
    console.error(err);
  }
}
</script>

<style>
.leaflet-container {
  z-index: 10;
  a.leaflet-popup-close-button {
    background-color: white;
    border-radius: 50%;
    border: 1px solid rgb(231, 231, 231);
    top: 8px;
    right: 8px;

    span {
      display: block;
      transform: translateY(-2px);
    }
  }
}
.leaflet-popup-content-wrapper {
  padding: 0;
  border-radius: 16px;

  .leaflet-popup-content {
    margin: 0;
    width: 288px !important;
    max-width: none !important;

    p {
      margin: 0;
    }

    a {
      color: white;
    }
  }
}
</style>
