<template>
  <Layout>
    <Text>
      Hello, a new message from {{ from }} ({{ fromEmail }}) has been received.
    </Text>
    <Text class="my-4"> Contact reason: {{ reason }} </Text>
    <Text class="my-4"> {{ text }} </Text>
  </Layout>
</template>

<script setup lang="ts">
import { Text } from "@vue-email/components";
import Layout from "./Layout.vue";

defineProps({
  from: String,
  fromEmail: String,
  reason: String,
  text: String,
});
</script>
