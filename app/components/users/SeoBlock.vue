<template>
  <section class="mt-12 border-t border-gray-200 pt-8 text-sm text-gray-600">
    <div class="prose prose-sm max-w-none">
      <h2 class="mb-4">
        {{
          $t("usersPage.seo.block.title", {
            city,
          })
        }}
      </h2>
      <p>
        {{
          $t("usersPage.seo.block.description", {
            city,
          })
        }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  city: string | null;
}>();
</script>
