<template>
  <Layout>
    <Text> {{ prefix }} {{ from }} {{ fromEmail }} </Text>
    <Text class="my-4"> {{ reason }} </Text>
    <Text class="my-4"> {{ text }} </Text>
  </Layout>
</template>

<script setup lang="ts">
import { Text } from "@vue-email/components";
import Layout from "./Layout.vue";

defineProps({
  prefix: String,
  from: String,
  fromEmail: String,
  reason: String,
  text: String,
});
</script>
