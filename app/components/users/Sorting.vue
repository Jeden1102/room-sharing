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
  { label: "Brak", value: null },
  { label: "Najnowsze", value: "newest" },
  { label: "Wiek rosnąco", value: "ageAsc" },
  { label: "Wiek malejąco", value: "ageDesc" },
  { label: "Budżet rosnąco", value: "budgetAsc" },
  { label: "Budżet malejąco", value: "budgetDesc" },
];

watch(
  filters,
  (val) => {
    emit("update", { ...val });
  },
  { deep: true },
);
</script>
