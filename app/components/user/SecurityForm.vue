<template>
  <div class="flex w-full flex-col gap-10">
    <Form
      v-slot="$form"
      :resolver="passwordResolver"
      @submit="onPasswordSubmit"
      class="flex w-full flex-col gap-6"
    >
      <Fieldset :legend="$t('userSecurityForm.passwordReset.legend')">
        <div class="flex flex-col gap-6">
          <div class="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            <AtomsInput
              name="oldPassword"
              :label="$t('userSecurityForm.passwordReset.oldPassword')"
              :form="$form"
              type="password"
            />
            <AtomsInput
              name="password"
              :label="$t('userSecurityForm.passwordReset.password')"
              :form="$form"
              type="password"
            />
            <AtomsInput
              name="passwordRepeat"
              :label="$t('userSecurityForm.passwordReset.passwordRepeat')"
              :form="$form"
              type="password"
            />
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <Button
            type="submit"
            :label="$t('userSecurityForm.passwordReset.submit')"
            :loading="passwordStatus.isLoading"
            class="mt-4 w-fit"
          />
          <Message
            class="w-full"
            :severity="passwordStatus.success ? 'info' : 'error'"
            v-if="passwordStatus.message"
          >
            {{ passwordStatus.message }}
          </Message>
        </div>
      </Fieldset>
    </Form>

    <Fieldset :legend="$t('userSecurityForm.accountDeletion.legend')">
      <div class="flex flex-col gap-4">
        <p>{{ $t("userSecurityForm.accountDeletion.warning") }}</p>
        <Button
          :label="$t('userSecurityForm.accountDeletion.openDialog')"
          @click="deleteDialogVisible = true"
          severity="danger"
          class="w-fit"
        />
      </div>
    </Fieldset>

    <Dialog
      v-model:visible="deleteDialogVisible"
      modal
      :header="$t('userSecurityForm.accountDeletion.dialogHeader')"
      class="w-11/12 md:w-120"
    >
      <p class="mb-4">
        {{ $t("userSecurityForm.accountDeletion.warning") }}
      </p>

      <Form
        v-slot="$form"
        :resolver="deleteResolver"
        @submit="onDeleteSubmit"
        class="flex w-full flex-col gap-4"
      >
        <AtomsInput
          name="passwordConfirmation"
          :label="$t('userSecurityForm.accountDeletion.password')"
          :form="$form"
          type="password"
        />

        <div class="flex gap-2">
          <Button
            :label="$t('userSecurityForm.accountDeletion.cancel')"
            @click="deleteDialogVisible = false"
            outlined
          />
          <Button
            type="submit"
            :label="$t('userSecurityForm.accountDeletion.confirm')"
            :loading="deleteStatus.isLoading"
            severity="danger"
          />
        </div>

        <Message
          v-if="deleteStatus.message"
          :severity="deleteStatus.success ? 'info' : 'error'"
        >
          {{ deleteStatus.message }}
        </Message>
      </Form>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { newPasswordSchema } from "~/schemas/auth";
import { z } from "zod";

const { t } = useI18n();

const passwordStatus = ref({ success: false, message: "", isLoading: false });
const passwordResolver = ref(zodResolver(newPasswordSchema));

const onPasswordSubmit = async ({ valid, values, reset }: any) => {
  if (!valid) return;
  passwordStatus.value.isLoading = true;

  try {
    const data = await $fetch("/api/user/new-password", {
      method: "POST",
      body: values,
    });

    passwordStatus.value.success = true;
    passwordStatus.value.message = t("userSecurityForm.passwordReset.success");
    reset();
  } catch (e: any) {
    passwordStatus.value.success = false;

    if (e.data.statusCode === 401) {
      passwordStatus.value.message = t(
        "userSecurityForm.passwordReset.invalidOldPassword",
      );
    } else {
      passwordStatus.value.message = t("userSecurityForm.passwordReset.error");
    }
  } finally {
    passwordStatus.value.isLoading = false;
  }
};

const deleteDialogVisible = ref(false);
const deleteStatus = ref({ success: false, message: "", isLoading: false });

const deleteSchema = z.object({
  passwordConfirmation: z
    .string()
    .min(1, { message: t("validation.required") }),
});
const deleteResolver = ref(zodResolver(deleteSchema));

const { signOut } = useAuth();

const onDeleteSubmit = async ({ valid, values }: any) => {
  if (!valid) return;
  deleteStatus.value.isLoading = true;

  try {
    const { data, error } = await $fetch("/api/user/delete-account", {
      method: "POST",
      body: values,
    });

    signOut();
    navigateTo("/");
  } catch (e: any) {
    deleteStatus.value.success = false;
    if (e.data.statusCode === 401) {
      deleteStatus.value.message = t(
        "userSecurityForm.passwordReset.invalidOldPassword",
      );
    } else {
      deleteStatus.value.message = t("userSecurityForm.passwordReset.error");
    }
  } finally {
    deleteStatus.value.isLoading = false;
  }
};
</script>
