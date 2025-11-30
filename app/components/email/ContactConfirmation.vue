<template>
  <Layout>
    <Text class="mb-4"> {{ greeting }} {{ from }} </Text>
    <Text class="mb-4">
      {{ confirmation }}
    </Text>
  </Layout>
</template>

<script setup lang="ts">
import { Text } from "@vue-email/components";
import Layout from "./Layout.vue";

defineProps({
  from: String,
  greeting: String,
  confirmation: String,
});
</script>
