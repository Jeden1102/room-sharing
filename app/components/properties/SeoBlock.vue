<template>
  <section class="mt-12 border-t border-gray-200 pt-8 text-sm text-gray-600">
    <div class="prose prose-sm max-w-none">
      <h2 class="mb-4">
        {{ title }}
      </h2>
      <p>
        {{
          $t("propertiesPage.seo.block.description", {
            city,
          })
        }}
      </p>
      <p class="mt-2 text-xs text-gray-400 italic">
        {{
          $t("propertiesPage.seo.block.footer", {
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
  type?: string | null;
  listingType?: string | null;
}>();

const { t } = useI18n();

const listingType = props.listingType
  ? t(`taxonomies.listingType.${props.listingType?.toLowerCase()}`)
  : null;
const type = props.type
  ? t(`taxonomies.propertyType.${props.type?.toLowerCase()}`)
  : null;

const title = computed(() => {
  return [listingType, type, props.city].filter(Boolean).join(" - ");
});
</script>
