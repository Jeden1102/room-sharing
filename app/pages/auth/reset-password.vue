<template>
  <div class="flex flex-col gap-8">
    <h1 class="text-3xl font-semibold md:text-4xl">
      {{ $t("resetPasswordPage.title") }}
    </h1>
    <AuthResetPassword :code />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "login",
  unauthenticatedOnly: true,
});

const { t } = useI18n();

usePageSeo({
  title: t("seo.resetPassword.title"),
  description: t("seo.resetPassword.description"),
});

const route = useRoute();

const code = route.query.code as string;

if (!code) {
  useRouter().push("/");
}
</script>
