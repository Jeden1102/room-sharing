<template>
  <ClientOnly>
    <DataTable
      v-if="data.properties"
      :value="data.properties"
      tableStyle="min-width: 50rem"
    >
      <Column field="title" header="Title" sortable style="width: 25%"></Column>
      <Column field="city" header="City" sortable style="width: 25%"></Column>
      <Column field="price" header="Price" sortable style="width: 25%"></Column>
      <Column
        field="status"
        header="Status"
        sortable
        style="width: 25%"
      ></Column>
      <Column header="Actions">
        <template #body="slotProps">
          <RouterLink
            :to="
              $localePath({
                name: 'properties-id',
                params: {
                  id: slugify(slotProps.data.title),
                },
                query: { id: slotProps.data.id },
              })
            "
          >
            Podgląd
          </RouterLink>
        </template>
      </Column>
    </DataTable>
  </ClientOnly>
</template>

<script setup lang="ts">
usePageSeo({
  title: "Properties",
  description: "Properties list",
});

const { status, data } = await useFetch("/api/properties/my", { lazy: true });
</script>
