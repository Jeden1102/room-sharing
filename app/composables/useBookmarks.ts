export function useBookmarks() {
    const isLoading = ref(false);
  
    const bookmark = async (entity: 'user' | 'property', id: string) => {
      isLoading.value = true;
      try {
        await $fetch(`/api/bookmark/${id}`, {
          method: 'POST',
          query: { entity }
        });
        return true;
      } catch (error) {
        console.error('Error bookmarking:', error);
        return false;
      } finally {
        isLoading.value = false;
      }
    };
  
    const removeBookmark = async (entity: 'user' | 'property', id: string) => {
      isLoading.value = true;
      try {
        await $fetch(`/api/bookmark/${id}`, {
          method: 'DELETE',
          query: { entity }
        });
        return true;
      } catch (error) {
        console.error('Error removing bookmark:', error);
        return false;
      } finally {
        isLoading.value = false;
      }
    };
  
    const toggleBookmark = async (entity: 'user' | 'property', id: string, isBookmarked: boolean) => {
      if (isBookmarked) {
        return await removeBookmark(entity, id);
      } else {
        return await bookmark(entity, id);
      }
    };
  
    return {
      bookmark,
      removeBookmark,
      toggleBookmark,
      isLoading: readonly(isLoading)
    };
  }