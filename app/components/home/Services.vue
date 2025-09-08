<template>
  <section class="container mb-30">
    <AppSectionTitle
      title="What are we providing"
      subtitle="Discover our services"
    />

    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="service in services"
        :key="service.title"
        class="overflow-hidden rounded-2xl pt-6 shadow-md"
      >
        <img
          :src="service.image"
          :alt="service.title"
          class="mx-auto size-20 object-cover"
        />

        <div class="space-y-4 p-6">
          <h3 class="text-xl font-semibold">{{ service.title }}</h3>
          <p class="text-gray-600">{{ service.description }}</p>

          <div class="flex gap-3">
            <Button
              v-for="(action, idx) in service.actions"
              asChild
              v-slot="slotProps"
              :severity="idx === 0 ? 'primary' : 'secondary'"
            >
              <RouterLink
                :to="action.link"
                :class="slotProps.class"
                class="md:w-full"
              >
                {{ action.label }}
              </RouterLink>
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
    title: "Buy & Sell Properties",
    description: "Buy your dream home or sell your property with ease.",
    image: "/icons/buy-property.svg",
    actions: [
      { label: "Browse", link: "/buy" },
      { label: "List your property", link: "/sell" },
    ],
  },
  {
    title: "Rent & Lease",
    description: "Find a place to rent or lease out your property to tenants.",
    image: "/icons/rent-property.svg",
    actions: [
      { label: "Find", link: "/rent" },
      { label: "Rent your property", link: "/lease" },
    ],
  },
  {
    title: "Share & Co-Living",
    description:
      "Share your property with others or join an existing co-living space.",
    image: "/icons/home-sharing.png",
    actions: [
      { label: "Offer a room", link: "/share" },
      { label: "Join co-living", link: "/coliving" },
    ],
  },
];
</script>
