<template>
  <div class="flex w-full flex-col gap-1">
    <label
      v-if="label"
      :for="id"
      class="ml-1 text-sm font-medium text-gray-700"
    >
      {{ label }}
    </label>

    <Editor
      :id="id"
      :name="name"
      editorStyle="height: 250px"
      :placeholder="placeholder"
      @load="onEditorLoad"
    >
      <template #toolbar>
        <span class="ql-formats">
          <select class="ql-header">
            <option value="2">{{ $t("textarea.header") }}</option>
            <option selected>{{ $t("textarea.default") }}</option>
          </select>
        </span>
        <span class="ql-formats">
          <button class="ql-bold"></button>
          <button class="ql-italic"></button>
          <button class="ql-underline"></button>
        </span>
        <span class="ql-formats">
          <button class="ql-list" value="ordered"></button>
          <button class="ql-list" value="bullet"></button>
        </span>
      </template>
    </Editor>

    <Message
      v-if="fieldState?.invalid"
      severity="error"
      size="small"
      variant="simple"
    >
      {{ fieldState.error?.message }}
    </Message>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string;
  label: string;
  placeholder?: string;
  form: any;
}>();

const id = useId();
const fieldState = computed(() => props.form?.[props.name]);

const onEditorLoad = ({ instance }: { instance: any }) => {
  instance.clipboard.addMatcher(
    Node.ELEMENT_NODE,
    (node: HTMLElement, delta: any) => {
      if (delta && Array.isArray(delta.ops)) {
        delta.ops.forEach((op: any) => {
          if (op.attributes) {
            const allowed = ["bold", "italic", "underline", "header", "list"];
            Object.keys(op.attributes).forEach((attr) => {
              if (!allowed.includes(attr)) {
                delete op.attributes[attr];
              }
            });
          }
        });
      }
      return delta;
    },
  );
};
</script>

<style>
.ql-editor ol li:is([data-list="bullet"])::before {
  content: "•";
}
</style>
