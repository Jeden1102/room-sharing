<template>
  <div
    class="fixed bottom-0 left-0 flex w-full items-center justify-between bg-white px-4 py-3 lg:hidden lg:px-4"
  >
    <Button
      v-for="link in links"
      :key="link.icon"
      asChild
      v-slot="slotProps"
      rounded
      :severity="link.featured ? 'primary' : 'secondary'"
      :icon="link.icon"
      :class="link.featured ? 'mb-4' : ''"
      size="large"
    >
      <RouterLink :to="$localePath(link.to)" :class="slotProps.class">
        <span :class="link.icon"></span>
      </RouterLink>
    </Button>
  </div>
</template>

<script setup lang="ts">
const { data } = useAuth();

const localePath = useLocalePath();

const links = [
  {
    icon: "pi pi-home",
    to: localePath("/"),
  },
  {
    icon: "pi pi-plus",
    to: localePath("/new-publication"),
  },
  {
    icon: "pi pi-search",
    to: localePath("/properties"),
    featured: true,
  },
  {
    icon: "pi pi-comment",
    to: localePath("/chat"),
  },
  {
    icon: "pi pi-user",
    to: localePath(data.value?.user ? "/user/profile" : "/auth/login"),
  },
];
</script>
