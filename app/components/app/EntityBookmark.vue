<template>
  <Button
    @click="handleBookmarkClick"
    :class="buttonClass"
    rounded
    :severity="isBookmarked ? 'primary' : 'secondary'"
    :loading="isLoading"
    :icon="isBookmarked ? 'pi pi-bookmark-fill' : 'pi pi-bookmark'"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  entityType: "user" | "property";
  entityId: string;
  initialBookmarked?: boolean;
  buttonClass?: string;
}>();

const { toggleBookmark, isLoading } = useBookmarks();
const isBookmarked = ref(props.initialBookmarked ?? false);

const handleBookmarkClick = async () => {
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
