<template>
  <section class="container-spacing container">
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
        <NuxtImg
          :src="service.image"
          :alt="$t(service.imageAltKey)"
          loading="lazy"
          class="mx-auto size-28 object-cover"
          width="300"
          height="300"
        />

        <div class="space-y-4 p-6">
          <h3 class="text-xl font-semibold">{{ $t(service.titleKey) }}</h3>
          <p class="text-gray-600">{{ $t(service.descriptionKey) }}</p>

          <div class="flex flex-col gap-3 sm:flex-row">
            <Button
              v-for="(action, idx) in service.actions"
              :key="action.labelKey"
              asChild
              v-slot="slotProps"
              :severity="idx === 0 ? 'primary' : 'secondary'"
            >
              <RouterLink
                :to="$localePath(action.link)"
                :class="slotProps.class"
                class="md:w-full"
              >
                {{ $t(action.labelKey) }}
              </RouterLink>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();

const { data } = useAuth();

const services = [
  {
    titleKey: "services.buyAndSell.title",
    descriptionKey: "services.buyAndSell.description",
    imageAltKey: "services.buyAndSell.imageAlt",
    image: "/gifs/buy-a-house.gif",
    actions: [
      {
        labelKey: "services.buyAndSell.browse",
        link: {
          name: "properties-filters",
          params: {
            filters: [
              slugify(t("taxonomies.propertyType.apartment")),
              slugify(t("taxonomies.listingType.sale")),
            ],
          },
        },
      },
      {
        labelKey: "services.buyAndSell.list",
        link: data.value?.user
          ? "new-property"
          : {
              name: "auth-login",
              query: { feat: "properties" },
            },
      },
    ],
  },
  {
    titleKey: "services.rentAndLease.title",
    descriptionKey: "services.rentAndLease.description",
    imageAltKey: "services.rentAndLease.imageAlt",
    image: "/gifs/lease.gif",
    actions: [
      {
        labelKey: "services.rentAndLease.find",
        link: {
          name: "properties-filters",
          params: {
            filters: [
              slugify(t("taxonomies.propertyType.apartment")),
              slugify(t("taxonomies.listingType.rent")),
            ],
          },
        },
      },
      {
        labelKey: "services.rentAndLease.rent",
        link: data.value?.user
          ? "new-property"
          : {
              name: "auth-login",
              query: { feat: "properties" },
            },
      },
    ],
  },
  {
    titleKey: "services.shareAndColiving.title",
    descriptionKey: "services.shareAndColiving.description",
    imageAltKey: "services.shareAndColiving.imageAlt",
    image: "/gifs/living-together.gif",
    actions: [
      {
        labelKey: "services.shareAndColiving.join",
        link: {
          name: "properties-filters",
          params: {
            filters: [
              slugify(t("taxonomies.propertyType.room")),
              slugify(t("taxonomies.listingType.rent")),
            ],
          },
        },
      },
      {
        labelKey: "services.shareAndColiving.offer",
        link: data.value?.user
          ? "new-property"
          : {
              name: "auth-login",
              query: { feat: "properties" },
            },
      },
    ],
  },
];
</script>
