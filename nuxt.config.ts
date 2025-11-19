import Aura from "@primeuix/themes/aura";

import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";

import { definePreset } from "@primeuix/themes";

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "#f0f6fc",
      100: "#d9e8f9",
      200: "#b3d1f2",
      300: "#80afe6",
      400: "#00509d",
      500: "#00478c",
      600: "#003e7a",
      700: "#003568",
      800: "#002b55",
      900: "#001a36",
      950: "#000d1b",
    },
  },
});

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,
    adminEmail: process.env.ADMIN_EMAIL,
    blobUrl: process.env.BLOB_URL,
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    nominatimUrl: process.env.NOMINATIM_URL,
    auth: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
    },
    public: {
      APP_BASE_URI: process.env.NUXT_PUBLIC_APP_BASE_URI,
      APP_PROD_URI: process.env.NUXT_PUBLIC_APP_PROD_URI,
    },
  },
  modules: [
    "@nuxt/fonts",
    "@nuxt/image",
    "@primevue/nuxt-module",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@sidebase/nuxt-auth",
    "nuxt-nodemailer",
    "nuxt-file-storage",
    "@nuxt/icon",
    "@nuxtjs/seo",
    "nuxt-security",
    "nuxt-easy-lightbox",
    ['@nuxtjs/leaflet', { ssr: false }]
  ],
  routeRules: {
    '/': { prerender: true },
  },
  fileStorage: {
    mount: process.cwd() + "/public/uploads",
  },
  fonts: {
    defaults: {
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    styles: ["normal", "italic"],
    },
    families: [{ name: "Inter", provider: "google" }],
  },
  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  primevue: {
    importTheme: false,
    treeshake: true,
    options: {
      theme: {
        preset: MyPreset,
        options: {
          prefix: "p",
          darkModeSelector: false,
          cssLayer: false,
        },
      },
    },
  },
  i18n: {
    defaultLocale: "en",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "pl", name: "Polish", file: "pl.json" },
    ],
  },
  image: {
    format: ["webp"],
  },
  auth: {
    isEnabled: true,
    disableServerSideAuth: false,
    originEnvKey: "AUTH_ORIGIN",
    baseURL: process.env.BASE_URL,
    provider: {
      type: "authjs",
      trustHost: false,
      defaultProvider: "github",
      addDefaultCallbackUrl: true,
      session: {
        dataType: {
          id: "string | number",
        },
      },
    },
    sessionRefresh: {
      enablePeriodically: true,
      enableOnWindowFocus: true,
    },
  },
  security: {
    rateLimiter: false,
    headers: {
      contentSecurityPolicy: {
        'img-src': [
          "'self'",
          'data:',
          'blob:',
          'https://*.vercel-storage.com',
          'https://*.openstreetmap.org',
          'https://*.basemaps.cartocdn.com',
          'https://*.stadiamaps.com',
        ]
      }
    }
  },
  nodemailer: {
    from: '"Rooms" <dev@dominikraducki.pl>',
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },
  nitro: {
    preset: 'vercel',
    vercel: {
      functions: {
        maxDuration: 10,
      },
    },
    rollupConfig: {
      plugins: [vue()],
    },
    compressPublicAssets: true,
  }
});