<template>
  <h1 class="text-3xl font-semibold md:text-4xl">
    {{ $t("confirmEmailPage.title") }}
  </h1>
  <p class="mt-2 mb-6 text-xl font-light">
    {{ responseMessage }}
  </p>
  <Button asChild v-slot="slotProps" v-if="!isError">
    <RouterLink :to="$localePath('/auth/login')" :class="slotProps.class">
      {{ $t("confirmEmailPage.goToLogin") }}
    </RouterLink>
  </Button>
</template>

<script setup lang="ts">
const { t } = useI18n();

definePageMeta({
  layout: "login",
});

usePageSeo({
  title: t("seo.confirmEmail.title"),
  description: t("seo.confirmEmail.description"),
});

const route = useRoute();

const code = route.query.code as string;

const responseMessage = ref("");
const isError = ref(true);

const confirmEmail = async () => {
  if (!code) {
    responseMessage.value = t("api.confirmEmail.missingCode");
    return;
  }
  try {
    const response: { message: string } = await $fetch(
      "/api/auth/confirm-email",
      {
        method: "POST",
        body: {
          code,
        },
      },
    );

    responseMessage.value = t(response.message);
    isError.value = false;
  } catch (error: any) {
    isError.value = true;
    if (error.data && error.data.statusMessage) {
      responseMessage.value = t(error.data.statusMessage);
    } else {
      responseMessage.value = t("confirmEmailPage.error");
    }
  }
};

onMounted(() => {
  confirmEmail();
});
</script>
