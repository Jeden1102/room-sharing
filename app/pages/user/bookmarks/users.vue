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
        :title="$t('userBookmarksUsersPage.empty.title')"
        :subtitle="$t('userBookmarksUsersPage.empty.subtitle')"
        :showLogo="true"
        variant="primary"
      >
        <Button asChild v-slot="slotProps" severity="secondary">
          <RouterLink
            :to="$localePath('users-filters')"
            :class="slotProps.class"
          >
            {{ $t("userBookmarksUsersPage.empty.button") }}
          </RouterLink>
        </Button>
      </AppCta>
    </template>

    <p v-if="error">{{ $t("userBookmarksUsersPage.error") }}</p>
  </div>
</template>

<script setup lang="ts">
usePageSeo({
  title: "seo.bookmarkedUsers.title",
  description: "seo.bookmarkedUsers.description",
});

const { data, error, pending } = await useFetch("/api/bookmark/users", {
  lazy: true,
});
</script>
