<template>
  <div class="flex flex-col gap-8">
    <h1 class="text-3xl font-semibold md:text-4xl">Password reset</h1>
    <AuthResetPassword :code />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "login",
  unauthenticatedOnly: true,
});

usePageSeo({
  title: "seo.resetPassword.title",
  description: "seo.resetPassword.description",
});

const route = useRoute();

const code = route.query.code as string;

if (!code) {
  useRouter().push("/");
}
</script>
