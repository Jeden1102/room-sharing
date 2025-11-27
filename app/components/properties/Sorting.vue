<template>
  <AtomsDropdown
    :label="$t('propertiesSorting.label')"
    :options="propertiesSortOptions"
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

const { propertiesSortOptions } = useTaxonomies();

watch(
  filters,
  (val) => {
    emit("update", { ...val });
  },
  { deep: true },
);
</script>
