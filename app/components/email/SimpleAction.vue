<script setup lang="ts">
import { Button, Text } from "@vue-email/components";
import Layout from "./Layout.vue";

defineProps({
  actionUrl: String,
  title: String,
  actionText: String,
});
</script>

<template>
  <Layout>
    <Text class="mb-4">
      {{ title }}
    </Text>
    <Button
      :href="actionUrl"
      class="bg-brand rounded px-3 py-2 font-medium text-white"
    >
      {{ actionText }}
    </Button>
  </Layout>
</template>
