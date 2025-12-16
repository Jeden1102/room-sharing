<template>
  <div v-if="data?.user">
    <Dialog
      v-model:visible="visible"
      modal
      :header="$t('entityReport.title')"
      class="w-120 max-w-11/12"
    >
      <Form
        v-slot="$form"
        :resolver="resolver"
        @submit="onSubmit"
        class="flex w-full flex-col gap-6 py-2"
      >
        <div>
          <AtomsDropdown
            :label="$t('entityReport.reason')"
            :options="reportOptions"
            optionLabel="label"
            optionValue="value"
            name="reason"
            :form="$form"
          />
        </div>

        <div>
          <AtomsBaseTextarea
            name="description"
            :label="$t('entityReport.description')"
            :rows="4"
            :form="$form"
            fluid
          />
        </div>

        <p class="text-sm text-gray-500">
          {{ $t("entityReport.reportConfirmation") }}
        </p>

        <FormTerms />

        <div class="flex gap-2">
          <Button
            type="submit"
            :label="$t('entityReport.send')"
            :loading="formStatus.isLoading"
            class="w-fit"
            severity="danger"
          />

          <Button
            :label="$t('entityReport.cancel')"
            :loading="formStatus.isLoading"
            class="w-fit"
            text
            @click="visible = false"
          />
        </div>

        <Message
          v-if="formStatus.message"
          class="w-full"
          :severity="formStatus.success ? 'info' : 'error'"
        >
          {{ formStatus.message }}
        </Message>
      </Form>
    </Dialog>

    <Button
      :label="$t('entityReport.title')"
      severity="danger"
      text
      @click="visible = true"
    />
  </div>
</template>

<script setup lang="ts">
import { z } from "zod";
import { zodResolver } from "@primevue/forms/resolvers/zod";

const { data } = useAuth();

const props = defineProps<{
  entity: "user" | "property";
  entityId: string;
}>();

const visible = ref(false);

const formStatus = ref({
  success: false,
  message: "",
  isLoading: false,
  terms: false,
});

const reportSchema = z.object({
  reason: z.string(),
  description: z.string().max(2048),
  terms: z.boolean(),
});

const resolver = ref(zodResolver(reportSchema));

const { reportOptions } = useTaxonomies();

const { t } = useI18n();

type ReportPayload = z.infer<typeof reportSchema>;

const onSubmit = async ({ valid, values, reset }: any) => {
  if (!valid) return;

  formStatus.value.isLoading = true;
  formStatus.value.message = "";

  try {
    await $fetch("/api/report", {
      method: "POST",
      body: {
        ...values,
        entity: props.entity,
        entityId: props.entityId,
      },
    });

    formStatus.value.success = true;
    formStatus.value.message = t("entityReport.success");

    reset();
  } catch (e: any) {
    formStatus.value.success = false;
    formStatus.value.message = t("entityReport.error");
  } finally {
    formStatus.value.isLoading = false;
  }
};
</script>
