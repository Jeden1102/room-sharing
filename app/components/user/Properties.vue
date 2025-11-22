<template>
  <ClientOnly v-if="data">
    <DataTable
      v-if="data.properties?.length > 0 && status === 'success'"
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
      <Column field="title" header="Title" sortable style="width: 25%" />
      <Column field="city" header="City" sortable style="width: 25%" />
      <Column field="price" header="Price" sortable style="width: 25%" />
      <Column field="status" header="Status" sortable style="width: 25%">
        <template #editor="{ data, field }">
          <AtomsDropdown
            name="listingType"
            label=""
            :options="statusOptions"
            optionLabel="label"
            optionValue="value"
            v-model="data[field]"
            :form="null"
          />
        </template>
      </Column>
      <Column header="Actions">
        <template #body="slotProps">
          <div class="flex gap-2">
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
                Preview
              </RouterLink>
            </Button>

            <Button asChild v-slot="buttonProps" severity="secondary">
              <RouterLink
                :class="buttonProps.class"
                :to="
                  $localePath({
                    name: 'properties-id-edit',
                    params: {
                      id: slugify(slotProps.data.title),
                    },
                    query: { id: slotProps.data.id },
                  })
                "
              >
                Edit
              </RouterLink>
            </Button>

            <Button
              severity="danger"
              icon="pi pi-trash"
              @click="openDeleteModal(slotProps.data)"
            />
          </div>
        </template>
      </Column>
      <Column
        :rowEditor="true"
        style="width: 10%; min-width: 8rem"
        bodyStyle="text-align:center"
      />
    </DataTable>

    <AppCta
      v-else-if="data.properties"
      title="You don't have any properties"
      subtitle="Feel free to create one. We are here to help you with any questions or concerns you may have."
      :showLogo="true"
      variant="primary"
    >
      <Button asChild v-slot="slotProps" severity="secondary">
        <RouterLink :to="$localePath('new-property')" :class="slotProps.class">
          Create new property
        </RouterLink>
      </Button>
    </AppCta>

    <Dialog
      v-model:visible="deleteModalVisible"
      modal
      header="Confirm deletion"
      :style="{ width: '25rem' }"
    >
      <p>
        Are you sure you want to delete
        <strong>{{ selectedProperty?.title }}</strong
        >?
      </p>

      <template #footer>
        <div class="mt-4 flex justify-end gap-2">
          <Button label="Cancel" @click="deleteModalVisible = false" />
          <Button
            label="Delete"
            severity="danger"
            :loading="isDeleting"
            @click="deleteProperty"
          />
        </div>
      </template>
    </Dialog>
  </ClientOnly>
</template>

<script setup lang="ts">
const statusOptions = [
  { label: "Szkic", value: "DRAFT" },
  { label: "Aktywne", value: "ACTIVE" },
  { label: "Zarezerwowane", value: "RESERVED" },
];

const editingRows = ref([]);
const deleteModalVisible = ref(false);
const selectedProperty = ref<any>(null);
const isDeleting = ref(false);

const { status, data, refresh } = await useFetch("/api/properties/my", {
  lazy: true,
});

const onRowEditSave = async (event: any) => {
  const { newData } = event;

  try {
    const res = await $fetch("/api/property/update", {
      method: "POST",
      body: {
        ...newData,
      },
    });

    if (res.success) {
      await refresh();
    }
  } catch (error: any) {
    console.error("Błąd aktualizacji:", error);
  }
};

const openDeleteModal = (property: any) => {
  selectedProperty.value = property;
  deleteModalVisible.value = true;
};

const deleteProperty = async () => {
  if (!selectedProperty.value) return;

  try {
    isDeleting.value = true;

    await $fetch(`/api/property/${selectedProperty.value.id}`, {
      method: "DELETE",
    });

    deleteModalVisible.value = false;
    selectedProperty.value = null;
    await refresh();
  } catch (error) {
    console.error("Błąd usuwania:", error);
  } finally {
    isDeleting.value = false;
  }
};
</script>
