<template>
  <main>
    <HomeHero />
    <LazyAppFaq
      title="Najczęściej zadawane pytania"
      subtitle="Zanim napiszesz do nas — sprawdź, może odpowiedź już tu jest"
      :containered="true"
      hydrate-on-visible
      :questions="[
        {
          question: 'Jak mogę dodać ogłoszenie o mieszkaniu?',
          answer:
            'Po zalogowaniu kliknij „Dodaj ogłoszenie”, wypełnij formularz i opublikuj. To zajmuje mniej niż 2 minuty.',
        },
        {
          question: 'Czy mogę współdzielić mieszkanie z innymi?',
          answer:
            'Tak! W naszej platformie to główny cel — możesz wyszukać współlokatorów lub dołączyć do istniejących ofert.',
        },
        {
          question: 'Czy platforma jest darmowa?',
          answer:
            'Tak, przeglądanie ogłoszeń i wyszukiwanie współlokatorów jest całkowicie bezpłatne.',
        },
      ]"
    />

    <LazyAppCta
      hydrate-on-visible
      title="Have some more questions?"
      subtitle="See the FAQ page to find answers to your questions."
    >
      <Button asChild v-slot="slotProps" severity="primary">
        <RouterLink :to="$localePath('faq')" :class="slotProps.class">
          Go to FAQ
        </RouterLink>
      </Button>
    </LazyAppCta>

    <LazyAppCta
      hydrate-on-visible
      title="We connect people searching for their dream apartments"
      subtitle="With the use of RealPro you can create searcher proflie or upload your
      apartment to seek for tenants."
      image="/images/home-cta.jpg"
      :showLogo="true"
      variant="primary"
    >
      <Button asChild v-slot="slotProps" severity="secondary">
        <RouterLink :to="$localePath('/auth/login')" :class="slotProps.class">
          Start now!
        </RouterLink>
      </Button>
    </LazyAppCta>

    <LazyHomeServices hydrate-on-visible />

    <LazyHomeCitiesBento hydrate-on-visible />
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  auth: false,
});

usePageSeo({
  title: "Home",
  description: "Find your next home",
});
</script>
