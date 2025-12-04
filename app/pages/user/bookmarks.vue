<template>
  <div>
    <nav class="flex flex-col gap-2 sm:flex-row">
      <Button
        v-for="item in userMenuItems"
        asChild
        v-slot="slotProps"
        :severity="item.command === route.path ? 'primary' : 'secondary'"
      >
        <RouterLink
          :to="item.command"
          :class="slotProps.class"
          :title="item.label"
        >
          <span>{{ item.label }}</span>
        </RouterLink>
      </Button>
    </nav>
    <div class="my-8 flex-1">
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
  title: "seo.bookmarks.title",
  description: "seo.bookmarks.description",
});

const userMenuItems = ref([
  {
    label: "Bookmarked properties",
    command: localePath("user-bookmarks-properties"),
  },
  {
    label: "Bookmarked users",
    command: localePath("user-bookmarks-users"),
  },
]);
</script>
