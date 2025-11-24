<template>
  <Form
    v-slot="$form"
    :resolver="resolver"
    @submit="onFormSubmit"
    class="flex w-full flex-col gap-6"
  >
    <Fieldset legend="Contact us">
      <div class="flex flex-col gap-6">
        <div>
          <FloatLabel variant="on">
            <InputText id="name" name="name" fluid />
            <label for="name">Name</label>
          </FloatLabel>
          <Message
            v-if="$form.name?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.name.error.message }}
          </Message>
        </div>

        <div>
          <FloatLabel variant="on">
            <InputText id="email" name="email" fluid />
            <label for="email">E-mail address</label>
          </FloatLabel>
          <Message
            v-if="$form.email?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.email.error.message }}
          </Message>
        </div>

        <div>
          <FloatLabel variant="on">
            <Dropdown
              id="reason"
              name="reason"
              :options="contactReasonOptions"
              optionLabel="label"
              optionValue="value"
              fluid
            />
            <label for="reason">Contact reason</label>
          </FloatLabel>
          <Message
            v-if="$form.reason?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.reason.error.message }}
          </Message>
        </div>

        <div>
          <FloatLabel variant="on" class="w-full">
            <Textarea
              id="description"
              name="description"
              autoResize
              rows="4"
              fluid
            />
            <label for="description">Description</label>
          </FloatLabel>
          <Message
            v-if="$form.description?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.description.error.message }}
          </Message>
        </div>

        <div class="flex gap-6">
          <div class="flex flex-row gap-2">
            <Checkbox id="terms" name="terms" binary />
            <label for="terms">
              By contacting us, you agree to our
              <NuxtLink :to="$localePath('/terms')" class="underline"
                >Terms of Service</NuxtLink
              >
              and
              <NuxtLink :to="$localePath('/privacy-policy')" class="underline">
                Privacy Policy
              </NuxtLink>
            </label>
          </div>
        </div>

        <Button
          type="submit"
          label="Send message"
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

const formStatus = ref({ success: false, message: "", isLoading: false });

const { contactReasonOptions } = useTaxonomies();

const resolver = ref(zodResolver(contactSchema));

const onFormSubmit = async ({ valid, values, reset }: any) => {
  if (!valid) return;
  formStatus.value.isLoading = true;

  try {
    const { data, error } = await useFetch("/api/contact", {
      method: "POST",
      body: values,
    });

    if (error.value) throw new Error(error.value.message);

    formStatus.value.success = true;
    formStatus.value.message = "Contact message sent.";
  } catch (e: any) {
    formStatus.value.success = false;
    formStatus.value.message = e.message || "There was an error.";
  } finally {
    formStatus.value.isLoading = false;
    reset();
  }
};
</script>
