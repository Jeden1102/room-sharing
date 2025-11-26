<template>
  <Layout>
    <Text>
      {{ $t("emailContact.greeting", { from, fromEmail }) }}
    </Text>
    <Text class="my-4"> {{ $t("emailContact.reason") }}: {{ reason }} </Text>
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
