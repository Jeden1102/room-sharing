<template>
  <Form
    v-slot="$form"
    :resolver="resolver"
    @submit="onFormSubmit"
    class="flex w-full flex-col gap-6"
  >
    <Fieldset :legend="$t('contactForm.legend')">
      <div class="flex flex-col gap-3">
        <div>
          <AtomsInput
            name="name"
            :label="$t('contactForm.name.label')"
            :form="$form"
          />
        </div>

        <div>
          <AtomsInput
            name="email"
            type="email"
            :label="$t('contactForm.email.label')"
            :form="$form"
          />
        </div>

        <div>
          <AtomsDropdown
            :label="$t('contactForm.reason.label')"
            :options="contactReasonOptions"
            optionLabel="label"
            optionValue="value"
            name="reason"
            :form="$form"
          />
        </div>

        <div>
          <AtomsBaseTextarea
            name="description"
            :label="$t('contactForm.description.label')"
            :rows="4"
            :form="$form"
            fluid
          />
        </div>

        <FormTerms />

        <Button
          type="submit"
          :label="$t('contactForm.button.submit')"
          :loading="formStatus.isLoading"
          class="mt-4 w-fit"
        />
        <Message
          class="w-full"
          :severity="formStatus.success ? 'info' : 'error'"
          v-if="formStatus.message"
        >
          {{ formStatus.message }}
        </Message>
      </div>
    </Fieldset>
  </Form>
</template>

<script setup lang="ts">
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { contactSchema } from "~/schemas/contact";

const { t } = useI18n();

const formStatus = ref({ success: false, message: "", isLoading: false });

const { contactReasonOptions } = useTaxonomies();

const resolver = ref(zodResolver(contactSchema));

const onFormSubmit = async ({ valid, values, reset }: any) => {
  if (!valid) return;
  formStatus.value.isLoading = true;

  try {
    const { error } = await useFetch("/api/contact", {
      method: "POST",
      body: values,
    });

    if (error.value) throw new Error(error.value.message);

    formStatus.value.success = true;
    formStatus.value.message = t("contactForm.response.success");
  } catch (e: any) {
    formStatus.value.success = false;
    formStatus.value.message = e.message || t("contactForm.response.error");
  } finally {
    formStatus.value.isLoading = false;
    reset();
  }
};
</script>
