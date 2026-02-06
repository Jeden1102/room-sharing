<template>
  <div class="relative isolate bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
    <div
      class="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
      aria-hidden="true"
    >
      <div
        class="from-primary-400 to-primary-600 mx-auto aspect-1155/678 w-288.75 bg-linear-to-tr opacity-20"
        style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "
      ></div>
    </div>

    <div class="container text-center">
      <h2 class="text-primary-300 text-base/7 font-semibold">
        {{ $t("pricing.badge") }}
      </h2>
      <h1
        class="mt-2 text-4xl font-semibold tracking-tight text-balance text-white sm:text-6xl"
      >
        {{ $t("pricing.title") }}
      </h1>
      <p
        class="mx-auto mt-6 max-w-2xl text-center text-lg text-pretty text-gray-400 sm:text-xl/8"
      >
        {{ $t("pricing.subtitle") }}
      </p>

      <div class="mt-10 flex justify-center">
        <SelectButton
          v-model="activeTab"
          :options="tabOptions"
          optionLabel="label"
          optionValue="value"
          :allowEmpty="false"
          class="pricing-tabs"
        />
      </div>
    </div>

    <div
      :class="[
        'mx-auto mt-16 grid gap-y-6 sm:mt-20 sm:gap-y-0',
        currentTiers.length === 3
          ? 'max-w-7xl lg:grid-cols-3'
          : 'max-w-4xl lg:grid-cols-2',
      ]"
    >
      <div
        v-for="(tier, tierIdx) in currentTiers"
        :key="tier.id"
        :class="[
          tier.featured
            ? 'relative z-10 bg-gray-800 lg:scale-105'
            : 'bg-white/2.5',
          'flex flex-col justify-between rounded-3xl p-8 ring-1 ring-white/10 sm:p-10',
        ]"
      >
        <div>
          <h3 :id="tier.id" class="text-primary-300 text-base/7 font-semibold">
            {{ tier.name }}
          </h3>
          <p class="mt-4 flex items-baseline gap-x-2">
            <span class="text-5xl font-semibold tracking-tight text-zinc-100">{{
              tier.priceMonthly
            }}</span>
            <span
              v-if="tier.priceMonthly !== 'Free' && tier.id !== 'addons'"
              class="text-base text-gray-400"
              >/month</span
            >
          </p>
          <p class="mt-6 text-base/7 text-gray-300">{{ tier.description }}</p>

          <ul
            role="list"
            class="mt-8 space-y-3 text-sm/6 text-gray-300 sm:mt-10"
          >
            <li
              v-for="feature in tier.features"
              :key="feature"
              class="flex gap-x-3"
            >
              <i class="pi pi-check text-primary-300 mt-1"></i>
              <span v-html="feature"></span>
            </li>
          </ul>
        </div>

        <Button
          asChild
          v-slot="slotProps"
          :severity="tier.featured ? 'primary' : 'secondary'"
        >
          <RouterLink
            :to="
              $localePath(
                data?.user
                  ? 'new-property'
                  : { name: 'auth-login', query: { feat: 'properties' } },
              )
            "
            :class="slotProps.class"
            class="mt-6"
          >
            {{ $t("nav.addProperty") }}
          </RouterLink>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data } = useAuth();
const { t } = useI18n();
const activeTab = ref("private");

const tabOptions = computed(() => [
  { label: t("pricing.tabs.private"), value: "private" },
  { label: t("pricing.tabs.business"), value: "business" },
  { label: t("pricing.tabs.dorm"), value: "dorm" },
]);

const businessAddons = [
  `19 zł - ${t("pricing.features.verified_badge")}`,
  `29 zł - ${t("pricing.features.featured_listing")}`,
  `14.90 zł - ${t("pricing.features.listing_bump")}`,
  `49 zł - ${t("pricing.features.pro_analytics")}`,
];

const currentTiers = computed(() => {
  if (activeTab.value === "private") {
    return [
      {
        name: t("pricing.private.free.name"),
        id: "tier-private-free",
        priceMonthly: "Free",
        description: t("pricing.private.free.desc"),
        features: [
          t("pricing.features.one_room_free"),
          t("pricing.features.standard_listing"),
          t("pricing.features.mobile_app"),
        ],
        featured: false,
      },
      {
        name: t("pricing.private.addons.name"),
        id: "addons",
        priceMonthly: "Add-ons",
        description: t("pricing.private.addons.desc"),
        features: [
          `19 zł - ${t("pricing.features.verified_badge")}`,
          `19 zł - ${t("pricing.features.featured_listing")}`,
          `14.90 zł - ${t("pricing.features.listing_bump")}`,
          `19 zł - ${t("pricing.features.additional_property")}`,
        ],
        featured: true,
      },
    ];
  } else if (activeTab.value === "business") {
    return [
      {
        name: t("pricing.business.basic.name"),
        id: "tier-biz-basic",
        priceMonthly: "49 zł",
        description: t("pricing.business.basic.desc"),
        features: [
          t("pricing.features.three_properties"),
          t("pricing.features.standard_profile"),
          t("pricing.features.basic_analytics"),
        ],
        featured: false,
      },
      {
        name: t("pricing.business.premium.name"),
        id: "tier-biz-premium",
        priceMonthly: "79 zł",
        description: t("pricing.business.premium.desc"),
        features: [
          t("pricing.features.five_properties"),
          t("pricing.features.advanced_profile"),
          t("pricing.features.client_reviews"),
        ],
        featured: true,
      },
      {
        name: t("pricing.private.addons.name"),
        id: "addons",
        priceMonthly: "Add-ons",
        description: t("pricing.business.addons.desc"),
        features: businessAddons,
        featured: false,
      },
    ];
  } else {
    return [
      {
        name: t("pricing.dorm.basic.name"),
        id: "tier-dorm-basic",
        priceMonthly: "99 zł",
        description: t("pricing.dorm.basic.desc"),
        features: [
          t("pricing.features.one_dorm_type"),
          t("pricing.features.map_pin"),
          t("pricing.features.photo_gallery"),
        ],
        featured: false,
      },
      {
        name: t("pricing.dorm.premium.name"),
        id: "tier-dorm-premium",
        priceMonthly: "199 zł",
        description: t("pricing.dorm.premium.desc"),
        features: [
          t("pricing.features.unlimited_dorm_rooms"),
          t("pricing.features.custom_map_pin"),
          t("pricing.features.priority_placement"),
        ],
        featured: true,
      },
      {
        name: t("pricing.private.addons.name"),
        id: "addons",
        priceMonthly: "Add-ons",
        description: t("pricing.dorm.addons.desc"),
        features: [
          ...businessAddons,
          `99 zł - ${t("pricing.features.dorm_bump")}`,
        ],
        featured: false,
      },
    ];
  }
});
</script>
