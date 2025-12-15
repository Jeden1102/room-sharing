<template>
  <main>
    <AppCta
      :title="$t('faqPage.hero.title')"
      :subtitle="$t('faqPage.hero.subtitle')"
      image="/images/faq.jpg"
      :showLogo="true"
      variant="primary"
    >
      <Button asChild v-slot="slotProps" severity="secondary">
        <RouterLink to="#questions" :class="slotProps.class">
          {{ $t("faqPage.hero.button") }}
        </RouterLink>
      </Button>
    </AppCta>
    <div class="card-base container mb-10">
      <Tabs value="0" id="questions">
        <TabList>
          <Tab value="0">{{ $t("faqPage.tabs.sharing") }}</Tab>
          <Tab value="1">{{ $t("faqPage.tabs.renting") }}</Tab>
          <Tab value="2">{{ $t("faqPage.tabs.other") }}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <AppFaq
              :questions="[
                {
                  question: $t('faqPage.sharing.q1.question'),
                  answer: $t('faqPage.sharing.q1.answer'),
                },
                {
                  question: $t('faqPage.sharing.q2.question'),
                  answer: $t('faqPage.sharing.q2.answer'),
                },
                {
                  question: $t('faqPage.sharing.q3.question'),
                  answer: $t('faqPage.sharing.q3.answer'),
                },
                {
                  question: $t('faqPage.sharing.q4.question'),
                  answer: $t('faqPage.sharing.q4.answer'),
                },
              ]"
            />
          </TabPanel>
          <TabPanel value="1">
            <AppFaq
              :questions="[
                {
                  question: $t('faqPage.renting.q1.question'),
                  answer: $t('faqPage.renting.q1.answer'),
                },
                {
                  question: $t('faqPage.renting.q2.question'),
                  answer: $t('faqPage.renting.q2.answer'),
                },
                {
                  question: $t('faqPage.renting.q3.question'),
                  answer: $t('faqPage.renting.q3.answer'),
                },
                {
                  question: $t('faqPage.renting.q4.question'),
                  answer: $t('faqPage.renting.q4.answer'),
                },
              ]"
            />
          </TabPanel>
          <TabPanel value="2">
            <AppFaq
              :questions="[
                {
                  question: $t('faqPage.other.q1.question'),
                  answer: $t('faqPage.other.q1.answer'),
                },
                {
                  question: $t('faqPage.other.q2.question'),
                  answer: $t('faqPage.other.q2.answer'),
                },
                {
                  question: $t('faqPage.other.q3.question'),
                  answer: $t('faqPage.other.q3.answer'),
                },
                {
                  question: $t('faqPage.other.q4.question'),
                  answer: $t('faqPage.other.q4.answer'),
                },
              ]"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
    <AppCta
      :title="$t('faqPage.cta.title')"
      :subtitle="$t('faqPage.cta.subtitle')"
      variant="secondary"
      video="/gifs/faq.gif"
    >
      <Button asChild v-slot="slotProps" severity="primary">
        <RouterLink :to="$localePath('contact')" :class="slotProps.class">
          {{ $t("faqPage.cta.button") }}
        </RouterLink>
      </Button>
    </AppCta>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  auth: false,
});

usePageSeo({
  title: "seo.faq.title",
  description: "seo.faq.description",
});
</script>
