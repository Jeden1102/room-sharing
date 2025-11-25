<template>
  <h1 class="text-3xl font-semibold md:text-4xl">E-mail confirmation</h1>
  <p class="mt-2 mb-6 text-xl font-light">
    {{ responseMessage }}
  </p>
  <Button asChild v-slot="slotProps" v-if="!isError">
    <RouterLink :to="$localePath('/auth/login')" :class="slotProps.class"
      >Go to login</RouterLink
    >
  </Button>
</template>

<script setup lang="ts">
const { signOut } = useAuth();

definePageMeta({
  layout: "login",
});

usePageSeo({
  title: "seo.confirmEmail.title",
  description: "seo.confirmEmail.description",
});

const route = useRoute();

const code = route.query.code as string;

const responseMessage = ref("");
const isError = ref(true);

if (!code) {
  useRouter().push("/");
}

const confirmEmail = async () => {
  signOut();
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

    responseMessage.value = response.message;
    isError.value = false;
  } catch (error: any) {
    isError.value = true;
    if (error.data && error.data.statusMessage) {
      responseMessage.value = error.data.statusMessage;
    } else {
      responseMessage.value = "Something went wrong. Please try again.";
    }
  }
};

onMounted(() => {
  confirmEmail();
});
</script>
