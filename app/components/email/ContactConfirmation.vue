<template>
  <Layout>
    <Text class="mb-4">
      {{ $t("emailContactConfirmation.greeting", { from }) }}
    </Text>
    <Text class="mb-4">
      {{ $t("emailContactConfirmation.message") }}
    </Text>
  </Layout>
</template>

<script setup lang="ts">
import { Text } from "@vue-email/components";
import Layout from "./Layout.vue";

defineProps({
  from: String,
});
</script>
