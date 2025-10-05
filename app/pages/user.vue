<template>
  <div
    class="container flex max-w-screen-lg flex-col py-6 md:flex-row lg:gap-6"
  >
    <nav class="flex gap-2 p-4 md:flex-col md:py-0">
      <Button
        v-for="item in userMenuItems"
        asChild
        v-slot="slotProps"
        :severity="item.command === route.path ? 'primary' : 'secondary'"
        size="large"
      >
        <RouterLink
          :to="item.command"
          :class="slotProps.class"
          class="w-full"
          :title="item.label"
        >
          <span :class="item.icon"></span>
        </RouterLink>
      </Button>
    </nav>
    <div class="flex-1">
      <NuxtPage />
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const localePath = useLocalePath();

definePageMeta({
  auth: true,
});

usePageSeo({
  title: "User",
  description: "User profile",
});

const userMenuItems = ref([
  {
    label: "Profile",
    icon: "pi pi-user",
    command: localePath("/user/profile"),
  },
  {
    label: "Favorites",
    icon: "pi pi-heart",
    command: localePath("/user/favorites"),
  },
  {
    label: "Chat",
    icon: "pi pi-comment",
    command: localePath("/user/chat"),
  },
  {
    label: "Settings",
    icon: "pi pi-cog",
    command: localePath("/user/settings"),
  },
]);
</script>
