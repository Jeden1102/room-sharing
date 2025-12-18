<template>
  <Button
    @click="handleBookmarkClick"
    :class="buttonClass"
    rounded
    :severity="isBookmarked ? 'primary' : 'secondary'"
    :loading="isLoading"
    :icon="isBookmarked ? 'pi pi-bookmark-fill' : 'pi pi-bookmark'"
    :title="
      isBookmarked
        ? $t('userBookmarksPage.unbookmark')
        : $t('userBookmarksPage.bookmark')
    "
  />
</template>

<script setup lang="ts">
const router = useRouter();

const { data } = useAuth();

const localePath = useLocalePath();

const props = defineProps<{
  entityType: "user" | "property";
  entityId: string;
  initialBookmarked?: boolean;
  buttonClass?: string;
}>();

const { toggleBookmark, isLoading } = useBookmarks();
const isBookmarked = ref(props.initialBookmarked ?? false);

const handleBookmarkClick = async () => {
  if (!data.value) {
    return router.push(
      localePath({
        name: "auth-login",
        query: { feat: "bookmarks" },
      }),
    );
  }

  const success = await toggleBookmark(
    props.entityType,
    props.entityId,
    isBookmarked.value,
  );
  if (success) {
    isBookmarked.value = !isBookmarked.value;
  }
};
</script>
