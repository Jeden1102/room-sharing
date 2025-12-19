<template>
  <nav class="container mt-4">
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

    <div class="block md:hidden">
      <NuxtLink
        v-if="backStep"
        :to="backStep.url"
        class="flex items-center gap-2 text-sm font-medium text-gray-700"
      >
        <Icon name="lucide:arrow-left" class="w-5 min-w-5 text-lg" />
        <span>{{ backStep.label }}</span>
      </NuxtLink>
    </div>
  </nav>
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

  if (route.name?.toString().includes("properties-filters")) {
    crumbs.push({ label: t("nav.properties"), url: localePath("/oferty") });

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
    crumbs.push({ label: t("nav.properties"), url: localePath("/oferty") });
    crumbs.push({ label: t("nav.propertyDetails") });
  } else if (route.path.includes("/uzytkownicy")) {
    crumbs.push({ label: t("nav.users"), url: localePath("/uzytkownicy") });
    if (route.params.id || route.query.id) {
      crumbs.push({ label: t("nav.userProfile") });
    }
  } else {
    const pathName = route.path.split("/").filter(Boolean).at(-1);
    if (pathName) {
      crumbs.push({ label: capitalize(pathName) });
    }
  }

  return crumbs;
});

const backStep = computed(() => {
  if (items.value.length < 2) return null;

  const reversedItems = [...items.value].reverse();

  const target = reversedItems.find((item) => {
    if (!item.url) return false;
    const cleanItemUrl = item.url.replace(/\/$/, "");
    const cleanCurrentUrl = route.path.replace(/\/$/, "");
    return cleanItemUrl !== cleanCurrentUrl;
  });

  return target || items.value[0];
});
</script>
