<template>
  <nav
    class="fixed bottom-0 left-0 z-10 flex w-full items-center justify-between bg-white px-4 py-3 lg:hidden lg:px-4"
  >
    <Button
      v-for="link in links"
      :key="link.icon"
      asChild
      v-slot="slotProps"
      rounded
      :severity="isActive(link.to) ? 'primary' : 'secondary'"
      :icon="link.icon"
      size="large"
    >
      <RouterLink
        :to="$localePath(link.to)"
        :class="slotProps.class"
        class="overflow-visible!"
        :title="link.title"
      >
        <span :class="link.icon"></span>

        <span
          v-if="link.badgeValue && link.badgeValue.value > 0"
          class="bg-primary-400 absolute -top-1 right-0 grid size-5 place-items-center rounded-full text-xs text-white"
        >
          {{ link.badgeValue }}
        </span>
      </RouterLink>
    </Button>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute();
const { data } = useAuth();
const localePath = useLocalePath();

const { unreadCount } = useNotifications();

const isActive = (path: string) => {
  return route.path === localePath(path);
};

const links = [
  {
    icon: "pi pi-home",
    to: localePath("/"),
    title: "Home",
  },
  {
    icon: "pi pi-plus",
    to: localePath(
      data.value?.user
        ? "new-property"
        : {
            name: "auth-login",
            query: { feat: "properties" },
          },
    ),
    title: "Add new property",
  },
  {
    icon: "pi pi-search",
    to: localePath("properties-filters"),
    title: "Properties",
  },
  {
    icon: "pi pi-comments",
    to: localePath("user-chat"),
    title: "Chat",
    badgeValue: unreadCount,
  },
  {
    icon: "pi pi-user",
    to: localePath(data.value?.user ? "user-profile" : "auth-login"),
    title: "Profile",
  },
];
</script>
