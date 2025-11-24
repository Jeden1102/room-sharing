<template>
  <section class="container mb-30">
    <AppSectionTitle
      :title="$t('services.sectionTitle')"
      :subtitle="$t('services.sectionSubtitle')"
    />

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="service in services"
        :key="service.titleKey"
        class="overflow-hidden rounded-2xl pt-6 shadow-md"
      >
        <BitsAnimatedContent :scale="0">
          <img
            :src="service.image"
            :alt="$t(service.imageAltKey)"
            class="mx-auto size-20 object-cover"
          />
        </BitsAnimatedContent>

        <div class="space-y-4 p-6">
          <BitsAnimatedContent>
            <h3 class="text-xl font-semibold">{{ $t(service.titleKey) }}</h3>
          </BitsAnimatedContent>
          <BitsAnimatedContent :delay="0.2">
            <p class="text-gray-600">{{ $t(service.descriptionKey) }}</p>
          </BitsAnimatedContent>

          <div class="flex gap-3">
            <Button
              v-for="(action, idx) in service.actions"
              :key="action.labelKey"
              asChild
              v-slot="slotProps"
              :severity="idx === 0 ? 'primary' : 'secondary'"
            >
              <BitsAnimatedContent :delay="0.4 + idx * 0.2" class="md:w-full">
                <RouterLink
                  :to="$localePath(action.link)"
                  :class="slotProps.class"
                  class="md:w-full"
                >
                  {{ $t(action.labelKey) }}
                </RouterLink>
              </BitsAnimatedContent>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const services = [
  {
    titleKey: "services.buyAndSell.title",
    descriptionKey: "services.buyAndSell.description",
    imageAltKey: "services.buyAndSell.imageAlt",
    image: "/icons/buy-property.svg",
    actions: [
      { labelKey: "services.buyAndSell.browse", link: "/properties" },
      { labelKey: "services.buyAndSell.list", link: "/new-property" },
    ],
  },
  {
    titleKey: "services.rentAndLease.title",
    descriptionKey: "services.rentAndLease.description",
    imageAltKey: "services.rentAndLease.imageAlt",
    image: "/icons/rent-property.svg",
    actions: [
      { labelKey: "services.rentAndLease.find", link: "/properties" },
      { labelKey: "services.rentAndLease.rent", link: "/new-property" },
    ],
  },
  {
    titleKey: "services.shareAndColiving.title",
    descriptionKey: "services.shareAndColiving.description",
    imageAltKey: "services.shareAndColiving.imageAlt",
    image: "/icons/home-sharing.png",
    actions: [
      { labelKey: "services.shareAndColiving.offer", link: "/new-property" },
      { labelKey: "services.shareAndColiving.join", link: "/properties" },
    ],
  },
];
</script>
