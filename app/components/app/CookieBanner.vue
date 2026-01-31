<template>
  <CookieControl :locale="locale">
    <template #bar>
      <div>
        <h2>{{ $t("cookies.title") }}</h2>
        <p>{{ $t("cookies.description") }}</p>
      </div>
    </template>
  </CookieControl>
</template>

<script setup lang="ts">
const { locale } = useI18n();
const { cookiesEnabledIds } = useCookieControl();
const { gtag } = useGtag();

watch(
  () => cookiesEnabledIds.value,
  (current) => {
    if (current?.includes("google-analytics")) {
      gtag("consent", "update", {
        ad_user_data: "granted",
        ad_personalization: "granted",
        ad_storage: "granted",
        analytics_storage: "granted",
      });
    }
  },
  { deep: true, immediate: true },
);
</script>

<style>
.cookieControl__ControlButton {
  left: 20px;
  bottom: 80px;

  @media (min-width: 768px) {
    right: 20px;
    left: unset;
    bottom: 20px;
  }
}

.cookieControl__BarContainer {
  gap: 0;
  background-color: white;
}
</style>
