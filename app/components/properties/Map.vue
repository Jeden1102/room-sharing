<template>
  <ClientOnly>
    <div
      id="map"
      ref="mapContainer"
      style="height: 80vh"
      class="overflow-hidden rounded-xl border border-gray-200"
    ></div>

    <div style="display: none">
      <div ref="popupContainer">
        <div v-if="activePropertyId">
          <PropertyTeaser
            v-if="propertyData"
            :property="propertyData"
            class="w-72"
          />
          <PropertyTeaserLoader v-else class="w-72" />
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import type { PropertyWithOwner } from "@/components/property/types";

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

const props = defineProps<{
  items: { latitude: number; longitude: number; id: string }[];
}>();

const { $L } = useNuxtApp();

const mapContainer = ref<HTMLElement | null>(null);
const mapInstance = ref<any>(null);
const popupContainer = ref<HTMLElement | null>(null);
const propertyData = ref<PropertyWithOwner | null>(null);
const activePropertyId = ref<string | null>(null);

async function loadProperty(id: string) {
  activePropertyId.value = id;
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

onMounted(async () => {
  await nextTick();

  const L = $L as any;

  if (!mapContainer.value || !L || typeof L.markerClusterGroup !== "function") {
    return;
  }

  mapInstance.value = L.map(mapContainer.value, {
    zoomAnimation: false,
    fadeAnimation: false,
  }).setView([51.91, 19.09], 6);

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
    { attribution: "&copy; OpenStreetMap contributors" },
  ).addTo(mapInstance.value);

  const customIcon = L.icon({
    iconUrl: "/icons/marker.svg",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const markerClusterGroup = L.markerClusterGroup({
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    maxClusterRadius: 50,
  });

  props.items.forEach((item) => {
    const marker = L.marker([item.latitude, item.longitude], {
      icon: customIcon,
    });
    marker.on("click", () => loadProperty(item.id));
    marker.bindPopup(() => popupContainer.value!, {
      maxWidth: 300,
      className: "custom-property-popup",
    });
    markerClusterGroup.addLayer(marker);
  });

  mapInstance.value.addLayer(markerClusterGroup);
});
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
    display: grid;
    place-content: center;

    span {
      display: block;
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
