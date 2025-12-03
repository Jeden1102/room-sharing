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
      <Column
        field="title"
        :header="$t('userProperties.table.title')"
        sortable
        style="width: 25%"
      />
      <Column
        field="city"
        :header="$t('userProperties.table.city')"
        sortable
        style="width: 25%"
      />
      <Column
        field="price"
        :header="$t('userProperties.table.price')"
        sortable
        style="width: 25%"
      />
      <Column
        field="status"
        :header="$t('userProperties.table.status')"
        sortable
        style="width: 25%"
      >
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
      <Column :header="$t('userProperties.table.actions')">
        <template #body="slotProps">
          <div class="flex gap-2">
            <Button asChild v-slot="buttonProps">
              <RouterLink
                :class="buttonProps.class"
                :to="
                  $localePath({
                    name: 'property-id',
                    params: {
                      id: slugify(slotProps.data.title),
                    },
                    query: { id: slotProps.data.id },
                  })
                "
              >
                {{ $t("userProperties.table.preview") }}
              </RouterLink>
            </Button>

            <Button asChild v-slot="buttonProps" severity="secondary">
              <RouterLink
                :class="buttonProps.class"
                :to="
                  $localePath({
                    name: 'property-id-edit',
                    params: {
                      id: slugify(slotProps.data.title),
                    },
                    query: { id: slotProps.data.id },
                  })
                "
              >
                {{ $t("userProperties.table.edit") }}
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
      :title="$t('userProperties.empty.title')"
      :subtitle="$t('userProperties.empty.subtitle')"
      :showLogo="true"
      variant="primary"
    >
      <Button asChild v-slot="slotProps" severity="secondary">
        <RouterLink :to="$localePath('new-property')" :class="slotProps.class">
          {{ $t("userProperties.empty.createButton") }}
        </RouterLink>
      </Button>
    </AppCta>

    <Dialog
      v-model:visible="deleteModalVisible"
      modal
      :header="$t('userProperties.deleteDialog.header')"
      :style="{ width: '25rem' }"
    >
      <p>
        {{ $t("userProperties.deleteDialog.message") }}
        <strong>{{ selectedProperty?.title }}</strong
        >?
      </p>

      <template #footer>
        <div class="mt-4 flex justify-end gap-2">
          <Button
            :label="$t('userProperties.deleteDialog.cancel')"
            @click="deleteModalVisible = false"
          />
          <Button
            :label="$t('userProperties.deleteDialog.confirm')"
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
const { statusOptions } = useTaxonomies();

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
