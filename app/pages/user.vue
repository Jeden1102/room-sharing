<template>
  <div
    class="container flex max-w-screen-lg flex-col md:flex-row lg:gap-6"
    :class="isChatPage ? 'py-0' : 'py-6'"
  >
    <nav
      class="flex gap-2 p-4 md:flex-col md:py-0"
      :class="isChatPage && 'hidden md:flex'"
    >
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

const isChatPage = computed(() => route.name?.includes("user-chat-id"));

definePageMeta({
  auth: true,
});

usePageSeo({
  title: "seo.user.title",
  description: "seo.user.description",
});

const userMenuItems = ref([
  {
    label: "Profile",
    icon: "pi pi-user",
    command: localePath("user-profile"),
  },
  {
    label: "My properties",
    icon: "pi pi-list",
    command: localePath("user-properties"),
  },
  {
    label: "Bookmarks",
    icon: "pi pi-bookmark",
    command: localePath("user-bookmarks-properties"),
  },
  {
    label: "Chat",
    icon: "pi pi-comment",
    command: localePath("user-chat"),
  },
  {
    label: "User Settings",
    icon: "pi pi-user-edit",
    command: localePath("user-settings"),
  },
  {
    label: "User Security",
    icon: "pi pi-cog",
    command: localePath("user-security"),
  },
]);
</script>
