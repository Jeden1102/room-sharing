<template>
  <AtomsDropdown
    label="Sortuj według"
    :options="sortOptions"
    optionLabel="label"
    optionValue="value"
    v-model="filters.sortBy"
    name="sortBy"
  />
</template>

<script setup lang="ts">
const emit = defineEmits(["update"]);

const filters = reactive({
  sortBy: "newest",
});

const sortOptions = [
  { label: "Najnowsze", value: "newest" },
  { label: "Najstarsze", value: "oldest" },
  { label: "Cena rosnąco", value: "priceAsc" },
  { label: "Cena malejąco", value: "priceDesc" },
  { label: "Powierzchnia rosnąco", value: "sizeAsc" },
  { label: "Powierzchnia malejąco", value: "sizeDesc" },
];

watch(
  filters,
  (val) => {
    emit("update", { ...val });
  },
  { deep: true },
);
</script>
