<template>
  <Breadcrumb :model="items" class="hidden !bg-transparent !p-0 md:block">
    <template #item="{ item }">
      <NuxtLink
        v-if="item.url"
        :to="item.url"
        class="hover:text-primary text-xs font-medium text-gray-600 transition-colors"
      >
        {{ item.label }}
      </NuxtLink>
      <span v-else class="text-xs font-bold text-gray-900">
        {{ item.label }}
      </span>
    </template>
    <template #separator>
      <span class="mx-1 grid place-content-center text-gray-400">
        <Icon
          name="material-symbols-light:chevron-right-rounded"
          class="text-lg"
        />
      </span>
    </template>
  </Breadcrumb>
</template>

<script setup lang="ts">
const route = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();

const items = computed(() => {
  const crumbs = [];

  crumbs.push({
    label: t("nav.home"),
    url: localePath("/"),
  });

  const pathName = route.path.split("/").filter(Boolean).at(-1);

  if (route.name?.toString().includes("properties-filters")) {
    crumbs.push({
      label: t("nav.properties"),
      url: localePath("properties-filters"),
    });

    const filters = (route.params.filters as string[]) || [];
    let currentPath = "/oferty";

    filters.forEach((filter) => {
      currentPath += `/${filter}`;
      crumbs.push({
        label: capitalize(filter),
        url: localePath(currentPath),
      });
    });
  } else if (route.name?.toString().includes("property-id")) {
    crumbs.push({
      label: t("nav.properties"),
      url: localePath("properties-filters"),
    });
    crumbs.push({ label: t("nav.propertyDetails") });
  } else {
    if (route.name) {
      const routeName = (route.name as string).split("___")[0];
      crumbs.push({ label: t(`nav.${routeName}`) });
    }
  }

  return crumbs;
});
</script>
