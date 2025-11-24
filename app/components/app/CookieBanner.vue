<template>
  <CookieControl locale="en">
    <template #bar>
      <div>
        <h2>Ciasteczka</h2>
        <p>
          Używamy cookies dla wygody i rozwoju strony. Ty decydujesz, które
          zaakceptujesz!
        </p>
      </div>
    </template>
  </CookieControl>
</template>

<script setup lang="ts">
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
}

.cookieControl__BarContainer {
  gap: 0;
}
</style>
