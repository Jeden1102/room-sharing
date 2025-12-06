<template>
  <Button asChild rounded severity="secondary">
    <RouterLink
      :to="
        $localePath(
          data?.user
            ? 'user-bookmarks-properties'
            : {
                name: 'auth-login',
                query: { feat: 'bookmarks' },
              },
        )
      "
      class="relative flex items-center"
    >
      <span class="pi pi-bookmark text-xl"></span>

      <span
        v-if="store.count > 0"
        class="bg-primary-400 absolute -top-4 -right-3 grid size-5 place-items-center rounded-full text-xs text-white"
      >
        {{ store.count }}
      </span>
    </RouterLink>
  </Button>
</template>

<script setup>
const { data } = useAuth();
import { useBookmarksStore } from "~/stores/bookmarks";

const store = useBookmarksStore();
store.load();
</script>
