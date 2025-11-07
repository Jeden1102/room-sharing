<template>
  <LMap
    style="height: 300px"
    :zoom="16"
    :center="[lat, lng]"
    :use-global-leaflet="false"
  >
    <LTileLayer
      url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
      attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      layer-type="base"
      name="OpenStreetMap"
    />
    <LMarker :lat-lng="[lat, lng]">
      <LIcon icon-url="/icons/marker.svg" :icon-size="[36, 36]" />
    </LMarker>
  </LMap>
</template>

<script lang="ts" setup>
defineProps<{
  lat: number;
  lng: number;
}>();
</script>
