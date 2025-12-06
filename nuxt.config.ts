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
    ['nuxt-nodemailer', { client: false }],
    ['nuxt-file-storage', { server: true, client: false }],
    "@nuxt/icon",
    "@nuxtjs/seo",
    "nuxt-security",
    "nuxt-easy-lightbox",
    ['@nuxtjs/leaflet', { ssr: false }],
    "@dargmuesli/nuxt-cookie-control"
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
    families: [{ name: "Poppins", provider: "google" }],
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
    defaultLocale: "pl",
    customRoutes: "config",
    pages: {
      index: {
        en: "/",
        pl: "/",
      },
      contact: {
        en: "/contact",
        pl: "/kontakt",
      },
      "properties-filters": {
        en: "/properties/[...filters]", 
        pl: "/oferty/[...filters]",
      },
      faq: {
        en: "/faq",
        pl: "/faq",
      },
      "new-property": {
        en: "/new-property",
        pl: "/dodaj-oferte",
      },
      privacy: {
        en: "/privacy-policy",
        pl: "/polityka-prywatnosci",
      },
      terms: {
        en: "/terms",
        pl: "/regulamin",
      },
      "auth-forgot-password": {
        en: "/auth/forgot-password",
        pl: "/auth/zapomnialem-hasla",
      },
      "auth-login": {
        en: "/auth/login",
        pl: "/auth/logowanie",
      },
      "auth-register": {
        en: "/auth/register",
        pl: "/auth/rejestracja",
      },
      "auth-reset-password": {
        en: "/auth/reset-password",
        pl: "/auth/resetuj-haslo",
      },
      "property-id": {
        en: "/property/[[id]]",
        pl: "/oferta/[[id]]",
      },
      "property-id-edit": {
        en: "/property/[[id]]/edit",
        pl: "/oferta/[[id]]/edytuj",
      },
      users: {
        en: "/users",
        pl: "/uzytkownicy",
      },
      "users-id": {
        en: "/users/[id]",
        pl: "/uzytkownicy/[id]",
      },
      user: {
        en: "/user",
        pl: "/profil",
      },
      "user-profile": {
        en: "/user/profile",
        pl: "/profil/dane",
      },
      "user-properties": {
        en: "/user/properties",
        pl: "/profil/moje-oferty",
      },
      "user-settings": {
        en: "/user/settings",
        pl: "/profil/ustawienia",
      },
      "user-chat": {
        en: "/user/chat",
        pl: "/profil/czat",
      },
      "user-bookmarks": {
        en: "/user/bookmarks",
        pl: "/profil/ulubione",
      },
      "user-bookmarks-properties": {
        en: "/user/bookmarks/properties",
        pl: "/profil/ulubione/oferty",
      },
      "user-bookmarks-users": {
        en: "/user/bookmarks/users",
        pl: "/profil/ulubione/uzytkownicy",
      },
    },
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
      enablePeriodically: 60000, // 1 minute
      enableOnWindowFocus: true,
    },
  },
  security: {
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
          '*'
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
  cookieControl: {
    colors: {
      barBackground: '#fff',
      barButtonBackground: '#fff',
      barButtonColor: '#00509d',
      barButtonHoverBackground: '#fff',
      barButtonHoverColor: '#00478c',
      barTextColor: '#000',
      checkboxActiveBackground: '#000',
      checkboxActiveCircleBackground: '#fff',
      checkboxDisabledBackground: '#ddd',
      checkboxDisabledCircleBackground: '#fff',
      checkboxInactiveBackground: '#000',
      checkboxInactiveCircleBackground: '#fff',
      controlButtonBackground: '#fff',
      controlButtonHoverBackground: '#000',
      controlButtonIconColor: '#000',
      controlButtonIconHoverColor: '#fff',
      focusRingColor: '#808080',
      modalBackground: '#fff',
      modalButtonBackground: '#fff',
      modalButtonColor: '#00509d',
      modalButtonHoverBackground: '#fff',
      modalButtonHoverColor: '#00478c',
      modalOverlay: '#000',
      modalOverlayOpacity: 0.8,
      modalTextColor: '#000',
      modalUnsavedColor: '#fff',
    },
    isControlButtonEnabled: false,
    locales: ['en', 'pl', 'uk'],
    cookies: {
      necessary: [
        {
          description: {
            en: 'Essential cookies for the website to function properly.',
            pl: 'Niezbędne pliki cookie do prawidłowego działania strony.'
          },
          id: 'necessary',
          name: {
            en: 'Necessary Cookies',
            pl: 'Niezbędne pliki cookie'
          },
          targetCookieIds: ['auth.session-token', 'auth.csrf-token'],
        }
      ],
      optional: [
        {
          description: {
            en: 'Analytics cookies help us improve the website.',
            pl: 'Pliki cookie analityczne pomagają nam ulepszać stronę.'
          },
          id: 'google-analytics',
          name: {
            en: 'Google Analytics',
            pl: 'Google Analytics'
          },
          targetCookieIds: ['_ga', '_gid', '_gat'],
        },
        {
          description: {
            en: 'Preference cookies store your settings.',
            pl: 'Pliki cookie preferencji przechowują Twoje ustawienia.'
          },
          id: 'preferences',
          name: {
            en: 'Preferences',
            pl: 'Preferencje'
          },
          targetCookieIds: ['user-preferences', 'theme'],
        }
      ]
    }
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