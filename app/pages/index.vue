<template>
  <main>
    <HomeHero />

    <HomeLatestProperties
      title="Properties for rent"
      subtitle="Discover our latest properties"
      type="rent"
      :properties="rentProperties"
    />

    <HomeServices />

    <HomeLatestProperties
      title="Properties for sale"
      subtitle="Discover our latest properties"
      type="sale"
      :properties="sellProperties"
    />

    <HomeCitiesBento />

    <HomeLatestProperties
      title="Properties for share"
      subtitle="Discover our latest properties"
      type="sale"
      :properties="rentProperties"
    />
  </main>
</template>

<script setup lang="ts">
import { rentProperties, sellProperties } from "~/data/properties";
</script>

<style scoped></style>
