<template>
  <div>
    <Select
      v-model="currentLocale"
      :options="locales"
      :optionLabel="getLocaleName"
      class="w-32"
      size="small"
    />
  </div>
</template>

<script setup>
const { locales, setLocale, locale, t } = useI18n();

const currentLocale = ref(locale.value);

const getLocaleName = (loc) => {
  return t(`languages.${loc.code}`);
};

watch(currentLocale, (newLocale) => {
  setLocale(newLocale.code);
});

onMounted(() => {
  currentLocale.value = locales.value.find((l) => l.code === locale.value);
});
</script>
