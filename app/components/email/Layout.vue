<template>
  <Html lang="pl">
    <Tailwind
      :config="{
        theme: {
          extend: {
            colors: { brand: '#00509d' },
          },
        },
      }"
    >
      <Body class="bg-gray-50 font-sans">
        <Container class="mx-auto max-w-xl rounded bg-white p-6 shadow-sm">
          <div class="mb-4 border-b border-gray-200 pb-2">
            <Img
              :src="config.public.APP_PROD_URI + '/logo.png'"
              width="80"
              height="63"
            />
          </div>

          <slot />

          <div
            class="mt-6 border-t border-gray-200 pt-2 text-center text-xs text-gray-500"
          >
            PokójZWami &copy; {{ new Date().getFullYear() }}
          </div>
        </Container>
      </Body>
    </Tailwind>
  </Html>
</template>

<script setup lang="ts">
import { Html, Body, Container, Tailwind, Img } from "@vue-email/components";

const config = useRuntimeConfig();
</script>
