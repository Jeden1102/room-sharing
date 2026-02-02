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
            >
              <i class="pi pi-phone"></i>
              <span>{{ $t("footer.contact.phone") }}</span>
            </a>
          </li>
          <li>
            <a
              class="hover:text-primary-400 flex items-center space-x-2"
              :href="`mailto:${$t('footer.contact.email')}`"
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
          >
            <i class="pi pi-tiktok"></i>
          </a>
        </div>
      </div>

      <div v-for="group in footerNavigation" :key="group.title">
        <h3 class="mb-3 font-semibold text-gray-900 lg:text-lg">
          {{ $t(group.title) }}
        </h3>
        <ul class="space-y-2 text-sm lg:space-y-3 lg:text-base">
          <li v-for="link in group.links">
            <NuxtLink
              v-if="link.to"
              :to="typeof link.to === 'function' ? link.to() : link.to"
              class="hover:text-primary-600 transition-colors"
            >
              {{ $t(link.label || "") }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="container mx-auto mt-8 border-t border-gray-300 pt-6 text-center text-sm text-gray-600"
    >
      <p>{{ currentYear + " " + $t("footer.copyrightText") }}</p>

      <ul
        class="mt-4 flex flex-col gap-2 md:flex-row md:justify-center md:gap-6"
      >
        <li v-for="link in bottomNavigation[0]?.links" :key="link.label">
          <NuxtLink v-if="link.to" :to="link.to" class="hover:underline">
            {{ $t(link.label) }}
          </NuxtLink>

          <button
            v-else
            @click="isModalActive = true"
            class="cursor-pointer hover:underline"
          >
            {{ $t(link.label) }}
          </button>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const currentYear = new Date().getFullYear();
const { isModalActive } = useCookieControl();
const { data: authData } = useAuth();
const localePath = useLocalePath();
const { t } = useI18n();

const { data: popularCities } = await useFetch("/api/seo/roommates-cities");

const roommatesLinks = computed(() => {
  let links = (popularCities.value || []).map((city) => ({
    label: t("footer.forRoommates.label", { city }),
    to: localePath({
      name: "users-filters",
      params: { filters: city?.toLowerCase() },
    }),
  }));

  links.unshift({
    label: t("footer.forRoommates.labelAll"),
    to: localePath({
      name: "users-filters",
    }),
  });

  return links;
});

const footerNavigation = computed(() => {
  return [
    {
      title: "footer.explore.title",
      links: [{ label: "footer.explore.faq", to: localePath("faq") }],
    },
    {
      title: "footer.forRenters.title",
      links: [
        {
          label: "footer.forRenters.rentApartment",
          to: localePath({
            name: "properties-filters",
            params: {
              filters: [slugify(t("taxonomies.propertyType.apartment"))],
            },
          }),
        },
        {
          label: "footer.forRenters.buyApartment",
          to: localePath({
            name: "properties-filters",
            params: {
              filters: [
                slugify(t("taxonomies.propertyType.apartment")),
                slugify(t("taxonomies.listingType.sale")),
              ],
            },
          }),
        },
        {
          label: "footer.forRenters.buyHouse",
          to: localePath({
            name: "properties-filters",
            params: {
              filters: [
                slugify(t("taxonomies.propertyType.house")),
                slugify(t("taxonomies.listingType.sale")),
              ],
            },
          }),
        },
        {
          label: "footer.forRenters.findRoom",
          to: localePath({
            name: "properties-filters",
            params: { filters: [slugify(t("taxonomies.propertyType.room"))] },
          }),
        },
      ],
    },
    {
      title: "footer.forRoommates.title",
      links: roommatesLinks.value,
    },
    {
      title: "footer.forOwners.title",
      links: [
        {
          label: "footer.forOwners.listProperty",
          to: () =>
            authData.value?.user
              ? localePath("new-property")
              : localePath({
                  name: "auth-login",
                  query: { feat: "properties" },
                }),
        },
        { label: "footer.forOwners.findTenant", to: localePath("users") },
      ],
    },
  ];
});

const bottomNavigation = [
  {
    links: [
      { label: "footer.legal.terms", to: localePath("terms") },
      { label: "footer.legal.privacy", to: localePath("privacy") },
      {
        label: "footer.legal.cookieSettings",
        to: null,
      },
    ],
  },
];
</script>
