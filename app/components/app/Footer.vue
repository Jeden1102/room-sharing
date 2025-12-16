<template>
  <footer class="mt-auto bg-gray-100 py-10 text-gray-700">
    <div
      class="container mx-auto grid grid-cols-1 gap-8 px-6 md:grid-cols-2 lg:grid-cols-5"
    >
      <div>
        <div class="mb-4 flex items-center space-x-2">
          <NuxtLink :to="$localePath('index')">
            <NuxtImg
              src="/logo.png"
              :alt="$t('footer.logoAlt')"
              width="80"
              height="63"
              loading="lazy"
            />
          </NuxtLink>
        </div>
        <ul class="space-y-2 text-sm lg:space-y-3 lg:text-base">
          <li>
            <a
              class="hover:text-primary-400 flex items-center space-x-2"
              :href="`tel:${$t('footer.contact.phone')}`"
              :title="$t('footer.contact.phoneLinkTitle')"
            >
              <i class="pi pi-phone"></i>
              <span>{{ $t("footer.contact.phone") }}</span>
            </a>
          </li>
          <li>
            <a
              class="hover:text-primary-400 flex items-center space-x-2"
              :href="`mailto:${$t('footer.contact.email')}`"
              :title="$t('footer.contact.emailLinkTitle')"
            >
              <i class="pi pi-envelope"></i>
              <span>{{ $t("footer.contact.email") }}</span>
            </a>
          </li>
        </ul>
        <div class="mt-4 flex space-x-4 text-gray-500">
          <a
            href="#"
            class="hover:text-primary-400 transition-colors"
            :title="$t('footer.social.tiktok')"
            :aria-label="$t('footer.social.tiktok')"
          >
            <i class="pi pi-tiktok"></i>
          </a>
        </div>
      </div>

      <div>
        <h3 class="mb-3 font-semibold lg:text-lg">
          {{ $t("footer.explore.title") }}
        </h3>
        <ul class="space-y-2 text-sm lg:space-y-3 lg:text-base">
          <li>
            <NuxtLink :to="$localePath('faq')" class="footer-link">
              {{ $t("footer.explore.faq") }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="mb-3 font-semibold lg:text-lg">
          {{ $t("footer.forRenters.title") }}
        </h3>
        <ul class="space-y-2 text-sm lg:space-y-3 lg:text-base">
          <li>
            <NuxtLink
              :to="
                $localePath({
                  name: 'properties-filters',
                  params: {
                    filters: [slugify($t('taxonomies.propertyType.apartment'))],
                  },
                })
              "
              class="footer-link"
            >
              {{ $t("footer.forRenters.rentApartment") }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="
                $localePath({
                  name: 'properties-filters',
                  params: {
                    filters: [slugify($t('taxonomies.propertyType.room'))],
                  },
                })
              "
              class="footer-link"
            >
              {{ $t("footer.forRenters.findRoom") }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="mb-3 font-semibold lg:text-lg">
          {{ $t("footer.forOwners.title") }}
        </h3>
        <ul class="space-y-2 text-sm lg:space-y-3 lg:text-base">
          <li>
            <NuxtLink :to="$localePath('new-property')" class="footer-link">
              {{ $t("footer.forOwners.listProperty") }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="$localePath('users')" class="footer-link">
              {{ $t("footer.forOwners.findTenant") }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="mb-3 font-semibold lg:text-lg">
          {{ $t("footer.legal.title") }}
        </h3>
        <ul class="space-y-2 text-sm lg:space-y-3 lg:text-base">
          <li>
            <NuxtLink :to="$localePath('terms')" class="footer-link">
              {{ $t("footer.legal.terms") }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="$localePath('privacy')" class="footer-link">
              {{ $t("footer.legal.privacy") }}
            </NuxtLink>
          </li>
          <li>
            <button
              @click="isModalActive = true"
              class="footer-link cursor-pointer"
            >
              {{ $t("footer.legal.cookieSettings") }}
            </button>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="container mx-auto mt-8 border-t border-gray-300 pt-6 text-center text-sm text-gray-600"
    >
      <p>{{ currentYear + " " + $t("footer.copyrightText") }}</p>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const currentYear = new Date().getFullYear();

const { isModalActive } = useCookieControl();
</script>
