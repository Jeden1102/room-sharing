<template>
  <div>
    <Button icon="pi pi-pencil" @click="visible = true" />
    <Dialog
      v-model:visible="visible"
      modal
      :header="title"
      :style="{ width: '30rem' }"
    >
      <FormFileUploader
        :id="id"
        :name="name"
        :label="title"
        v-model="internalValue"
        @filesSelected="onFilesSelected"
        @delete="onDelete"
        :maxFiles="1"
        :canSetPrimary="false"
      />

      <template #footer>
        <div class="flex justify-end gap-2">
          <Button
            type="button"
            :label="$t('fileUploaderDialog.cancelButton')"
            severity="secondary"
            @click="onCancel"
          />
          <Button
            type="button"
            :label="$t('fileUploaderDialog.saveButton')"
            :loading="isLoading"
            @click="onSave"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string | null;
  id: string;
  name: string;
  title: string;
  entity: string;
  field: string;
}>();

const emit = defineEmits<{
  (e: "upload", value: string[] | null): void;
  (e: "delete"): void;
}>();

const visible = ref(false);
const isLoading = ref(false);
const files = ref<File[]>([]);
const internalValue = ref<string[]>(props.modelValue ? [props.modelValue] : []);

watch(
  () => props.modelValue,
  (val) => {
    internalValue.value = val ? [val] : [];
  },
);

const onFilesSelected = (newFiles: File[]) => {
  files.value = newFiles;
};

const onCancel = () => {
  files.value = [];
  internalValue.value = props.modelValue ? [props.modelValue] : [];
  visible.value = false;
};

const onSave = async () => {
  if (!files.value.length) {
    visible.value = false;
    return;
  }

  try {
    isLoading.value = true;
    const formData = new FormData();
    if (!files.value[0]) return;
    formData.append(props.field, files.value[0]);

    const response = await $fetch<string[]>("/api/files", {
      method: "POST",
      body: formData,
    });

    emit("upload", response);
    files.value = [];
    visible.value = false;
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};

const onDelete = async () => {
  try {
    isLoading.value = true;
    await $fetch("/api/files/delete", {
      method: "POST",
      body: {
        uri: internalValue.value[0],
        entity: props.entity,
        field: props.field,
        images: null,
      },
    });
    emit("delete");
    internalValue.value = [];
    visible.value = false;
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};
</script>
