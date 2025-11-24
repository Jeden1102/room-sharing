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
const {
  cookiesEnabled,
  cookiesEnabledIds,
  isConsentGiven,
  isModalActive,
  moduleOptions,
} = useCookieControl();

watch(
  () => cookiesEnabledIds.value,
  (current, previous) => {
    if (
      !previous?.includes("google-analytics") &&
      current?.includes("google-analytics")
    ) {
      // cookie with id `google-analytics` got added
      //   window.location.reload();
    }
  },
  { deep: true },
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
}
</style>
