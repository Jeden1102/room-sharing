<template>
  <main>
    <AppCta
      title="Need some help or have any questions?"
      subtitle="We are here to help you with any questions or concerns you may have."
      image="/images/faq.jpg"
      :showLogo="true"
      variant="primary"
    >
      <Button asChild v-slot="slotProps" severity="secondary">
        <RouterLink to="#questions" :class="slotProps.class">
          See all questions
        </RouterLink>
      </Button>
    </AppCta>
    <div class="card-base container mb-10">
      <Tabs value="0" id="questions">
        <TabList>
          <Tab value="0">Dzielenie mieszkań</Tab>
          <Tab value="1">Wynajmowanie mieszkań</Tab>
          <Tab value="2">Inne pytania</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <AppFaq
              :questions="[
                {
                  question: 'Jak mogę znaleźć współlokatora?',
                  answer:
                    'W wyszukiwarce wybierz opcję „Szukam współlokatora” lub „Chcę dołączyć do mieszkania”. Możesz filtrować oferty po wieku, płci, stylu życia i lokalizacji.',
                },
                {
                  question:
                    'Czy mogę zobaczyć, ile wolnych miejsc jest w mieszkaniu?',
                  answer:
                    'Tak — każda oferta pokazuje aktualną liczbę dostępnych miejsc oraz profil osób, które już tam mieszkają.',
                },
                {
                  question:
                    'Jak skontaktować się z osobą, która szuka współlokatora?',
                  answer:
                    'Po zalogowaniu możesz wysłać wiadomość bezpośrednio z poziomu ogłoszenia. Pamiętaj, by uzupełnić swój profil – zwiększa to szansę na akceptację.',
                },
                {
                  question:
                    'Czy mogę dodać preferencje dotyczące współlokatora?',
                  answer:
                    'Tak, w sekcji „Profil” możesz określić swoje preferencje (np. spokojny tryb życia, niepalący, student itp.), a system automatycznie dopasuje oferty.',
                },
              ]"
            />
          </TabPanel>
          <TabPanel value="1">
            <AppFaq
              :questions="[
                {
                  question: 'Jak dodać ogłoszenie o wynajmie?',
                  answer:
                    'Po zalogowaniu kliknij „Dodaj ogłoszenie”, wypełnij dane nieruchomości, dodaj zdjęcia i określ, czy mieszkanie może być współdzielone. Ogłoszenie będzie widoczne od razu po zatwierdzeniu.',
                },
                {
                  question:
                    'Czy mogę dodać informację o wolnych pokojach w istniejącym mieszkaniu?',
                  answer:
                    'Oczywiście. W formularzu ogłoszenia wybierz typ „pokój” i wskaż liczbę dostępnych miejsc. Możesz też opisać, kogo szukasz (np. studentkę, osobę pracującą, itp.).',
                },
                {
                  question:
                    'Czy mogę samodzielnie ustalić zasady współdzielenia?',
                  answer:
                    'Tak, to Twoje ogłoszenie – możesz określić preferencje dotyczące współlokatorów, zasad mieszkania, kosztów wspólnych mediów i inne szczegóły.',
                },
                {
                  question: 'Czy platforma pobiera prowizję za wynajem?',
                  answer:
                    'Nie. Nie pobieramy żadnej prowizji od transakcji – kontakt między użytkownikami odbywa się bezpośrednio.',
                },
              ]"
            />
          </TabPanel>
          <TabPanel value="2">
            <AppFaq
              :questions="[
                {
                  question: 'Czy korzystanie z platformy jest darmowe?',
                  answer:
                    'Tak. Wyszukiwanie ofert, dodawanie ogłoszeń i kontakt z użytkownikami są darmowe. Płatne mogą być jedynie usługi promowania ogłoszeń.',
                },
                {
                  question: 'Jak zwiększyć widoczność mojego ogłoszenia?',
                  answer:
                    'Możesz skorzystać z opcji wyróżnienia oferty, dodania zdjęć premium lub weryfikacji konta — wszystkie te działania zwiększają zaufanie i widoczność w wynikach wyszukiwania.',
                },
                {
                  question: 'Czy muszę mieć konto, żeby przeglądać ogłoszenia?',
                  answer:
                    'Nie, ogłoszenia możesz przeglądać bez logowania. Konto jest potrzebne dopiero, gdy chcesz dodać własne ogłoszenie lub napisać do innego użytkownika.',
                },
                {
                  question:
                    'Jak mogę zgłosić nieodpowiednie ogłoszenie lub użytkownika?',
                  answer:
                    'Pod każdym ogłoszeniem znajdziesz przycisk „Zgłoś”. Nasz zespół weryfikuje każde zgłoszenie w ciągu 24 godzin.',
                },
              ]"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
    <AppCta
      title="Haven't found an answer to your question?"
      subtitle="Feel free to ask us anything. We are here to help you with any questions or concerns you may have."
      variant="secondary"
    >
      <Button asChild v-slot="slotProps" severity="primary">
        <RouterLink :to="$localePath('contact')" :class="slotProps.class">
          Contact us
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
  title: "Faq",
  description: "Faq",
});
</script>
