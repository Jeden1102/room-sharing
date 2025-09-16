<!-- emails/ActionEmail.vue -->
<script setup lang="ts">
import { Button, Text } from "@vue-email/components";
import Layout from "./Layout.vue";
</script>

<template>
  <Layout>
    <Text class="mb-4">
      Hej, kliknij w przycisk poniżej aby aktywować konto:
    </Text>
    <Button
      href="https://example.com/activate"
      class="bg-brand rounded px-3 py-2 font-medium text-white"
    >
      Aktywuj konto
    </Button>
  </Layout>
</template>
