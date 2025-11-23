<template>
  <div>
    <UserTeaserLoader v-if="pending" v-for="i in 8" :key="i" />

    <template v-else-if="data.bookmarks">
      <div class="grid gap-4 md:grid-cols-2" v-if="data.bookmarks.length > 0">
        <UserTeaser
          v-for="user in data.bookmarks"
          :key="user.id"
          :user="user.target"
          variant="large"
        />
      </div>

      <AppCta
        v-else
        title="You don't have any bookmarked users yet"
        subtitle="Explore the users we have for you. Bookmark a user and it will show up here."
        :showLogo="true"
        variant="primary"
      >
        <Button asChild v-slot="slotProps" severity="secondary">
          <RouterLink :to="$localePath('users')" :class="slotProps.class">
            Explore users
          </RouterLink>
        </Button>
      </AppCta>
    </template>

    <p v-if="error">Błąd pobierania userów</p>
  </div>
</template>

<script setup lang="ts">
usePageSeo({
  title: "Bookmarks",
  description: "Saved users",
});

const { data, error, pending } = await useFetch("/api/bookmark/users");
</script>
