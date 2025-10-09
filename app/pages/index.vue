<template>
  <main>
    <HomeHero />
    <AppCta
      title="We connect people searching for their dream apartments"
      subtitle="With the use of RealPro you can create searcher proflie or upload your
      apartment to seek for tenants."
      image="/images/home-cta.jpg"
    >
      <Button asChild v-slot="slotProps" severity="secondary">
        <RouterLink :to="$localePath('/auth/login')" :class="slotProps.class">
          Start now!
        </RouterLink>
      </Button>
    </AppCta>

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

definePageMeta({
  auth: false,
});

usePageSeo({
  title: "Home",
  description: "Find your next home",
});
</script>
