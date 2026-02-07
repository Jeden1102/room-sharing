<template>
  <Html lang="pl">
    <Head />
    <Tailwind
      :config="{
        theme: {
          extend: {
            colors: {
              brand: '#00509d',
            },
          },
        },
      }"
    >
      <Body class="bg-[#f3f4f6] py-10 font-sans">
        <Container
          class="mx-auto max-w-[600px] overflow-hidden rounded-lg bg-white shadow-lg"
        >
          <Section class="p-8 text-center">
            <Link :href="config.public.APP_PROD_URI">
              <Img
                :src="config.public.APP_PROD_URI + '/logo.png'"
                width="100"
                alt="PokójZWami"
                class="mx-auto"
              />
            </Link>
          </Section>

          <Section class="px-10 py-8">
            <slot />
          </Section>

          <Section class="bg-gray-50 px-10 py-6 text-center">
            <div class="mb-4 flex justify-center gap-4">
              <Link href="#" class="hover:text-brand text-gray-400">
                <Img
                  :src="config.public.APP_PROD_URI + '/icons/instagram.png'"
                  width="20"
                  height="20"
                />
              </Link>
              <Link href="#" class="hover:text-brand text-gray-400">
                <Img
                  :src="config.public.APP_PROD_URI + '/icons/tik-tok.png'"
                  width="20"
                  height="20"
                />
              </Link>
            </div>

            <Text class="m-0 text-xs leading-relaxed text-gray-400">
              &copy; {{ new Date().getFullYear() }} PokójZWami Team. Wszystkie
              prawa zastrzeżone.
            </Text>

            <div class="mt-4">
              <Link
                :href="config.public.APP_PROD_URI + '/privacy'"
                class="text-brand text-xs underline"
              >
                Polityka prywatności
              </Link>
              <span class="mx-2 text-gray-300">|</span>
              <Link
                :href="config.public.APP_PROD_URI + '/contact'"
                class="text-brand text-xs underline"
              >
                Kontakt
              </Link>
            </div>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
</template>

<script setup lang="ts">
import {
  Html,
  Body,
  Container,
  Tailwind,
  Img,
  Section,
  Text,
  Link,
  Head,
} from "@vue-email/components";

const config = useRuntimeConfig();
</script>
