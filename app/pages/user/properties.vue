<template>
  <ClientOnly>
    <DataTable
      v-if="data.properties"
      :value="data.properties"
      tableStyle="min-width: 50rem"
      paginator
      stripedRows
      :rows="10"
      v-model:editingRows="editingRows"
      editMode="row"
      dataKey="id"
      @row-edit-save="onRowEditSave"
    >
      <Column field="title" header="Title" sortable style="width: 25%">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" fluid />
        </template>
      </Column>
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
          <Button asChild v-slot="buttonProps">
            <RouterLink
              :class="buttonProps.class"
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
          </Button>
        </template>
      </Column>
      <Column
        :rowEditor="true"
        style="width: 10%; min-width: 8rem"
        bodyStyle="text-align:center"
      ></Column>
    </DataTable>
  </ClientOnly>
</template>

<script setup lang="ts">
usePageSeo({
  title: "Properties",
  description: "Properties list",
});

const editingRows = ref([]);

const onRowEditSave = (event) => {
  let { newData, index } = event;

  console.log(newData, index);
};

const { status, data } = await useFetch("/api/properties/my", { lazy: true });
</script>
