<template>
  <div>
    <Select
      v-model="currentLocale"
      :options="locales"
      optionLabel="name"
      class="w-32"
      @change="setLocale(locale.code)"
      size="small"
    />
  </div>
</template>

<script setup>
const { locales, setLocale, locale } = useI18n();

const currentLocale = ref(locale.value);

watch(currentLocale, (newLocale) => {
  setLocale(newLocale.code);
});

onMounted(() => {
  currentLocale.value = locales.value.find((l) => l.code === locale.value);
});
</script>
