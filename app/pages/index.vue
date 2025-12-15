<template>
  <main>
    <HomeHero />

    <LazyHomeServices hydrate-on-visible />

    <LazyHomeItemsCarousel
      hydrate-on-visible
      v-if="properties"
      :title="$t('recentlyAdded.title')"
      :subtitle="$t('recentlyAdded.subtitle')"
      :items="properties?.properties"
      entity="property"
    />

    <LazyHomeCitiesBento hydrate-on-visible />

    <LazyAppCta
      hydrate-on-visible
      :title="$t('cta.connectPeople.title')"
      :subtitle="$t('cta.connectPeople.subtitle')"
      gif="/gifs/bubble-chat.gif"
      :showLogo="true"
      variant="primary"
    >
      <Button asChild v-slot="slotProps" severity="secondary">
        <RouterLink :to="$localePath('users')" :class="slotProps.class">
          {{ $t("cta.connectPeople.button") }}
        </RouterLink>
      </Button>
    </LazyAppCta>

    <LazyAppFaq
      :title="$t('faq.title')"
      :subtitle="$t('faq.subtitle')"
      :containered="true"
      hydrate-on-visible
      :questions="faqQuestions"
    />

    <LazyAppCta
      hydrate-on-visible
      :title="$t('cta.moreQuestions.title')"
      :subtitle="$t('cta.moreQuestions.subtitle')"
      gif="/gifs/faq.gif"
    >
      <Button asChild v-slot="slotProps" severity="primary">
        <RouterLink :to="$localePath('faq')" :class="slotProps.class">
          {{ $t("cta.moreQuestions.button") }}
        </RouterLink>
      </Button>
    </LazyAppCta>
  </main>
</template>

<script setup lang="ts">
import type { PropertyWithOwner } from "@/components/property/types";

definePageMeta({
  auth: false,
});

const { t } = useI18n();

usePageSeo({
  title: t("seo.home.title"),
  description: t("seo.home.description"),
});

const { data: properties, pending } = await useFetch<{
  properties: PropertyWithOwner[];
  total: number;
}>("/api/properties", {
  query: {
    limit: 6,
    sortBy: "newest",
    page: 1,
  },
  lazy: true,
  key: "home-properties",
});

const faqQuestions = computed(() => [
  {
    question: t("faq.questions.addListing.question"),
    answer: t("faq.questions.addListing.answer"),
  },
  {
    question: t("faq.questions.shareRoom.question"),
    answer: t("faq.questions.shareRoom.answer"),
  },
  {
    question: t("faq.questions.pricing.question"),
    answer: t("faq.questions.pricing.answer"),
  },
  {
    question: t("faq.questions.roommate.question"),
    answer: t("faq.questions.roommate.answer"),
  },
]);
</script>
