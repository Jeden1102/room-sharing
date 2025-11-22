<template>
  <Button asChild rounded severity="secondary">
    <RouterLink to="/user/bookmarks" class="relative flex items-center">
      <span class="pi pi-bookmark text-xl"></span>

      <span
        v-if="store.count > 0"
        class="bg-primary-400 absolute -top-4 -right-3 rounded-full px-1.5 py-0.5 text-xs text-white"
      >
        {{ store.count }}
      </span>
    </RouterLink>
  </Button>
</template>

<script setup>
import { useBookmarksStore } from "~/stores/bookmarks";

const store = useBookmarksStore();
store.load();
</script>
