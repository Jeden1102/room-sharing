<script setup lang="ts">
import { Button, Text } from "@vue-email/components";
import Layout from "./Layout.vue";

defineProps({
  confirmationUrl: String,
});
</script>

<template>
  <Layout>
    <Text class="mb-4">
      Hej, kliknij w przycisk poniżej aby aktywować konto:
    </Text>
    <Button
      :href="confirmationUrl"
      class="bg-brand rounded px-3 py-2 font-medium text-white"
    >
      Aktywuj konto
    </Button>
  </Layout>
</template>
