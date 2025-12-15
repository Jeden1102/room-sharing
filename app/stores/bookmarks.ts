import { defineStore } from "pinia";

export const useBookmarksStore = defineStore("bookmarks", () => {
  const count = ref(0);
  const loaded = ref(false);

  const load = async (isLogged : boolean) => {
    if (process.server) return; 
    if (loaded.value) return;

    if (!isLogged) return 0;

    try {
      const data: { count: number } = await $fetch("/api/bookmark/count");
      count.value = data.count;
      loaded.value = true;
    } catch (err) {
      console.error("Failed to load bookmark counts", err);
    }
  };

  const increment = () => {
    count.value++;
  };

  const decrement = () => {
    count.value--;
  };

  return {
    count,
    loaded,
    load,
    increment,
    decrement
  };
});
