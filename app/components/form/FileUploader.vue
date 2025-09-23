<template>
  <div class="w-full">
    <label class="mb-2 block font-medium">{{ label }}</label>

    <FileUpload
      :id="id"
      :name="name"
      multiple
      accept="image/*"
      customUpload
      :showUploadButton="false"
      :showCancelButton="false"
      @select="onFileSelect"
    />

    <div v-if="modelValue?.length" class="mt-3 flex flex-wrap gap-6">
      <div
        v-for="(img, idx) in modelValue"
        :key="idx"
        class="relative size-40 overflow-hidden rounded-lg shadow"
      >
        <img :src="img" class="h-full w-full object-cover" />
        <Button
          class="!absolute top-2 right-2 z-10"
          @click="confirmDelete(img)"
          icon="pi pi-trash"
          size="small"
        ></Button>
      </div>
    </div>

    <Dialog
      v-model:visible="deleteDialogVisible"
      modal
      header="Confirm deletion"
    >
      <p class="mb-4">Are you sure you want to delete this image?</p>
      <div class="flex justify-end gap-2">
        <Button
          label="Cancel"
          severity="secondary"
          @click="deleteDialogVisible = false"
        />
        <Button label="Delete" severity="danger" @click="doDelete" />
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: { type: String, required: true },
  name: { type: String, default: "files" },
  label: { type: String, default: "Upload files" },
  modelValue: { type: Array as PropType<string[]>, default: () => [] },
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
  (e: "filesSelected", files: File[]): void;
  (e: "delete", file: string): void;
}>();

const onFileSelect = (event: any) => {
  emit("filesSelected", event.files);
};

const deleteDialogVisible = ref(false);
const imageToDelete = ref<string | null>(null);

const confirmDelete = (file: string) => {
  imageToDelete.value = file;
  deleteDialogVisible.value = true;
};

const doDelete = () => {
  if (imageToDelete.value) {
    emit("delete", imageToDelete.value);
  }
  deleteDialogVisible.value = false;
  imageToDelete.value = null;
};
</script>
