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
        :title="link.title"
      >
        <span :class="link.icon"></span>
      </RouterLink>
    </Button>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute();
const { data } = useAuth();
const localePath = useLocalePath();

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
      data.value?.user ? "/new-property" : "/auth/login?feat=newProperty",
    ),
    title: "Add new property",
  },
  {
    icon: "pi pi-search",
    to: localePath("/properties"),
    title: "Properties",
  },
  {
    icon: "pi pi-comment",
    to: localePath("/user/chat"),
    title: "Chat",
  },
  {
    icon: "pi pi-user",
    to: localePath(data.value?.user ? "/user/profile" : "/auth/login"),
    title: "Profile",
  },
];
</script>
