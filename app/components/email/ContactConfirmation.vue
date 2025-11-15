<template>
  <Layout>
    <Text class="mb-4"> Hello {{ from }}, </Text>
    <Text class="mb-4">
      We have received your message and will get back to you soon.
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
