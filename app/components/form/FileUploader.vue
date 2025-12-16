<template>
  <div class="w-full">
    <label class="mb-2 block font-medium">{{ label }}</label>
    <FileUpload
      :id="id"
      :name="name"
      multiple
      accept="image/*"
      :showUploadButton="false"
      :showCancelButton="false"
      @select="onFileSelect"
      @remove="onFileRemove"
      :fileLimit="maxFiles"
      :maxFileSize="maxFileSize"
      :invalidFileSizeMessage="
        $t('validation.invalidFileSize', {
          max: formatBytesToMB(maxFileSize || 0),
        })
      "
      :invalidFileLimitMessage="
        $t('validation.invalidFileLimit', { max: maxFiles || 0 })
      "
    />
    <div
      v-if="modelValue?.length"
      class="mt-3 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4"
    >
      <div
        v-for="(img, idx) in modelValue"
        :key="idx"
        class="max-size-40 relative overflow-hidden rounded-lg shadow"
      >
        <img :src="img" class="h-40 w-full object-cover" />
        <Button
          class="!absolute top-2 right-2 z-10"
          @click="confirmDelete(img)"
          icon="pi pi-trash"
          size="small"
        ></Button>
        <Button
          v-if="canSetPrimary"
          class="!absolute top-14 right-2 z-10"
          @click="handleSetAsPrimary(idx)"
          icon="pi pi-star"
          size="small"
          :severity="idx === primaryImgIdx ? 'info' : 'secondary'"
        ></Button>
      </div>
    </div>

    <Dialog
      v-model:visible="deleteDialogVisible"
      modal
      :header="$t('fileUploader.deleteDialog.header')"
    >
      <p class="mb-4">{{ $t("fileUploader.deleteDialog.message") }}</p>
      <div class="flex justify-end gap-2">
        <Button
          :label="$t('fileUploader.deleteDialog.cancelButton')"
          severity="secondary"
          @click="deleteDialogVisible = false"
        />
        <Button
          :label="$t('fileUploader.deleteDialog.confirmButton')"
          severity="danger"
          @click="doDelete"
        />
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import imageCompression from "browser-image-compression";

interface FileUploaderProps {
  id: string;
  name: string;
  label: string;
  modelValue: string[];
  maxFiles: number;
  primaryImageIdx?: number;
  canSetPrimary: boolean;
  maxFileSize?: number;
}

const props = defineProps<FileUploaderProps>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
  (e: "filesSelected", files: File[]): void;
  (e: "delete", file: string): void;
  (e: "setAsPrimary", idx: number): void;
}>();

const primaryImgIdx = ref(props.primaryImageIdx);
const deleteDialogVisible = ref(false);
const imageToDelete = ref<string | null>(null);
const filesInQueue = ref<File[]>([]);

watch(
  () => props.primaryImageIdx,
  (newIdx) => {
    primaryImgIdx.value = newIdx;
  },
);

const compressOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
  fileType: "image/webp",
};

const onFileSelect = async (event: any) => {
  const filesToCompress: File[] = event.files;

  if (filesToCompress.length === 0) return;

  filesInQueue.value = filesToCompress;

  try {
    const compressedFiles: File[] = await Promise.all(
      filesToCompress.map(async (f) => {
        let compressedFile = f;

        if (f.size > compressOptions.maxSizeMB * 1048576) {
          const compressed = await imageCompression(f, compressOptions);

          compressedFile = new File([compressed], f.name, {
            type: compressed.type,
            lastModified: Date.now(),
          }) as File;
        }

        return compressedFile;
      }),
    );

    emit("filesSelected", compressedFiles);
  } catch (error) {
    console.error("Files could not be compressed", error);
    emit("filesSelected", filesToCompress);
  }
};

const onFileRemove = async (event: any) => {
  const fileToRemove: File = event.file;

  const index = filesInQueue.value.findIndex(
    (f) => f.name === fileToRemove.name && f.size === fileToRemove.size,
  );

  if (index !== -1) {
    filesInQueue.value.splice(index, 1);
  }

  await onFileSelect({ files: filesInQueue.value });
};

const handleSetAsPrimary = (idx: number) => {
  primaryImgIdx.value = idx;
  emit("setAsPrimary", idx);
};

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
