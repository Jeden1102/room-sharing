<template>
  <ClientOnly v-if="data">
    <DataTable
      v-if="data.properties?.length > 0 && status === 'success'"
      v-model:filters="filters"
      filterDisplay="row"
      :value="data.properties"
      tableStyle="min-width: 60rem"
      class="p-datatable-sm w-full table-fixed"
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
        filter
        :showFilterMenu="false"
        style="width: 20%"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="w-full"
          />
        </template>
      </Column>

      <Column
        field="city"
        :header="$t('userProperties.table.city')"
        sortable
        filter
        :showFilterMenu="false"
        style="width: 15%"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="w-full"
          />
        </template>
      </Column>

      <Column
        field="price"
        :header="$t('userProperties.table.price')"
        sortable
        style="width: 15%"
      >
      </Column>

      <Column
        field="status"
        :header="$t('userProperties.table.status')"
        sortable
        filter
        :showFilterMenu="false"
        style="width: 15%"
      >
        <template #body="slotProps">
          <span class="block truncate">
            {{ $t(`taxonomies.status.${slotProps.data.status.toLowerCase()}`) }}
          </span>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Select
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="statusOptions"
            optionLabel="label"
            optionValue="value"
            class="w-full"
            :showClear="true"
          />
        </template>
        <template #editor="{ data, field }">
          <AtomsDropdown
            name="status"
            label=""
            :options="statusOptions"
            optionLabel="label"
            optionValue="value"
            v-model="data[field]"
            :form="null"
          />
        </template>
      </Column>

      <Column :header="$t('userProperties.table.actions')" style="width: 25%">
        <template #body="slotProps">
          <div class="flex gap-2">
            <Button asChild v-slot="buttonProps" size="small">
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

            <Button
              asChild
              v-slot="buttonProps"
              severity="secondary"
              size="small"
            >
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
              size="small"
              @click="openDeleteModal(slotProps.data)"
              :title="$t('userProperties.table.delete')"
            />
          </div>
        </template>
      </Column>

      <Column
        :rowEditor="true"
        style="width: 10%"
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
import type { Property } from "@prisma/client";
import { FilterMatchMode } from "@primevue/core/api";

const { statusOptions } = useTaxonomies();

const editingRows = ref([]);
const deleteModalVisible = ref(false);
const selectedProperty = ref<Property | null>(null);
const isDeleting = ref(false);

const filters = ref({
  title: { value: null, matchMode: FilterMatchMode.CONTAINS },
  city: { value: null, matchMode: FilterMatchMode.CONTAINS },
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
});

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
  } catch (error: unknown) {
    console.error("Upate property error", error);
  }
};

const openDeleteModal = (property: Property) => {
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
    console.error("Error deleting property", error);
  } finally {
    isDeleting.value = false;
  }
};
</script>
