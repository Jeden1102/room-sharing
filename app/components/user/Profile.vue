<template>
  <div class="min-h-screen">
    <div class="relative">
      <div class="relative">
        <NuxtImg
          class="h-40 w-full rounded-md object-cover md:h-52"
          :src="user.bgImage || '/images/user/bg-placeholder.webp'"
          :alt="$t('userProfile.coverAlt')"
        />
        <FormFileUploaderDialog
          v-if="editable"
          v-model="user.bgImage"
          id="bgImage"
          name="bgImage"
          :title="$t('userProfile.backgroundImage')"
          entity="user"
          field="bgImage"
          class="absolute top-4 right-4"
          @upload="(res) => onUploadImg(res, 'bgImage')"
          @delete="() => onDeleteImg('bgImage')"
        />
      </div>

      <div
        class="absolute bottom-0 left-4 flex w-[calc(100%-2rem)] translate-y-1/2 transform items-end gap-6"
      >
        <div class="relative flex w-full justify-between gap-2">
          <div class="relative">
            <NuxtImg
              :src="user.profileImage || '/images/user/avatar-placeholder.webp'"
              :alt="$t('userProfile.profileAlt')"
              format="webp"
              width="128"
              height="128"
              class="h-32 w-32 cursor-pointer rounded-full border-4 border-white object-cover shadow-lg"
              @click="isProfileImageVisible = true"
            />

            <FormFileUploaderDialog
              v-if="editable"
              v-model="user.profileImage"
              id="profileImage"
              name="profileImage"
              :title="$t('userProfile.profileImage')"
              entity="user"
              field="profileImage"
              class="absolute right-0 bottom-4"
              @upload="(res) => onUploadImg(res, 'profileImage')"
              @delete="() => onDeleteImg('profileImage')"
            />
          </div>

          <div class="mt-auto flex gap-2">
            <AppChatButton :target-user-id="user.id" />
            <AppEntityBookmark
              entity-type="user"
              :entity-id="user.id"
              :initial-bookmarked="user.isBookmarked"
              v-if="user.id !== data?.user?.id"
            />
          </div>
        </div>
      </div>
    </div>

    <vue-easy-lightbox
      :visible="isProfileImageVisible"
      :imgs="user.profileImage || '/images/user/avatar-placeholder.webp'"
      :rotateDisabled="true"
      :zoomDisabled="true"
      :pinchDisabled="true"
      @hide="isProfileImageVisible = false"
    />

    <div class="mx-auto mt-24">
      <div class="flex flex-col gap-6">
        <div class="space-y-6">
          <div class="card-base">
            <p class="text-lg font-semibold text-gray-600">
              {{ user.firstName }} {{ user.lastName }}
            </p>
            <p class="mt-2 text-sm text-gray-700">
              <template v-if="user.age || user.city">
                {{ user.age }} {{ $t("userProfile.yearsOld") }} •
                {{ user.city }}
              </template>
              <template v-if="user.districts.length > 0">
                | {{ user.districts.join(", ") }}
              </template>
            </p>
          </div>

          <div class="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div class="card-base flex items-center gap-3">
              <i class="pi pi-user text-primary-500 text-xl"></i>
              <div>
                <div class="text-xs text-gray-500">
                  {{ $t("userProfile.infoCards.name.label") }}
                </div>
                <div class="font-medium" v-if="user.firstName && user.lastName">
                  {{ user.firstName }} {{ user.lastName }}
                </div>
                <div class="font-medium" v-else>
                  {{ $t("userProfile.noData") }}
                </div>
              </div>
            </div>

            <div class="card card-base flex items-center gap-3">
              <i class="pi pi-briefcase text-primary-500 text-xl"></i>
              <div>
                <div class="text-xs text-gray-500">
                  {{ $t("userProfile.infoCards.occupation.label") }}
                </div>
                <div class="font-medium">
                  <span
                    v-if="userOccupations.length > 0"
                    v-for="occupation in userOccupations"
                    :key="occupation?.id"
                    >{{ occupation?.name }}</span
                  >
                  <span v-else>{{ $t("userProfile.noData") }}</span>
                </div>
              </div>
            </div>

            <div class="card-base flex items-center gap-3">
              <i class="pi pi-wallet text-primary-500 text-xl"></i>
              <div>
                <div class="text-xs text-gray-500">
                  {{ $t("userProfile.infoCards.budget.label") }}
                </div>
                <div class="font-medium">
                  <span v-if="user.budgetMax">
                    {{ formatCurrency(user.budgetMax) }}
                  </span>
                  <span v-else>{{ $t("userProfile.noData") }}</span>
                </div>
              </div>
            </div>

            <div class="card-base flex items-center gap-3">
              <i class="pi pi-map-marker text-primary-500 text-xl"></i>
              <div>
                <div class="text-xs text-gray-500">
                  {{ $t("userProfile.infoCards.location.label") }}
                </div>
                <div class="font-medium" v-if="user.city">
                  {{ user.city }}
                  <template v-if="user.districts.length > 0">
                    | {{ user.districts.join(", ") }}
                  </template>
                </div>
                <div class="font-medium" v-else>
                  {{ $t("userProfile.noData") }}
                </div>
              </div>
            </div>

            <div class="card-base flex items-center gap-3">
              <Icon name="cil:smoke" class="text-primary-500 text-xl" />
              <div>
                <div class="text-xs text-gray-500">
                  {{ $t("userProfile.infoCards.smoker.label") }}
                </div>
                <div class="font-medium">
                  {{
                    user.smoker ? $t("userProfile.yes") : $t("userProfile.no")
                  }}
                </div>
              </div>
            </div>

            <div class="card-base flex items-center gap-3">
              <Icon
                name="material-symbols:pets"
                class="text-primary-500 text-xl"
              />
              <div>
                <div class="text-xs text-gray-500">
                  {{ $t("userProfile.infoCards.pets.label") }}
                </div>
                <div class="font-medium">
                  {{ user.pets ? $t("userProfile.yes") : $t("userProfile.no") }}
                </div>
              </div>
            </div>
          </div>

          <AppCard
            :title="$t('userProfile.description.title')"
            v-if="user.description"
          >
            <div
              class="leading-relaxed whitespace-pre-line text-gray-700"
              v-html="user.description?.replaceAll('\n', '<br />')"
            ></div>
            <div class="mt-4" v-if="userInterests.length > 0">
              <div class="flex flex-wrap gap-2">
                <Tag
                  v-for="interest in userInterests"
                  :key="interest?.id"
                  class="capitalize"
                  :value="interest?.name"
                />
              </div>
            </div>
          </AppCard>
        </div>

        <div class="flex flex-col gap-4 md:flex-row">
          <AppCard
            :title="$t('userProfile.searchPreferences.title')"
            class="flex-1 space-y-3 text-sm text-gray-700"
          >
            <strong class="mb-2 block text-gray-900"
              >{{ $t("userProfile.searchPreferences.preferences") }}:</strong
            >
            <PropertyAmenity
              v-if="userSearchPreferences.length > 0"
              v-for="pref in userSearchPreferences"
              :label="pref?.name || ''"
              :key="pref?.id || ''"
            />
            <span v-else class="pl-2">{{ $t("userProfile.noData") }}</span>

            <strong class="mb-2 block text-gray-900"
              >{{ $t("userProfile.searchPreferences.propertyType") }}:</strong
            >
            <PropertyAmenity
              v-if="userSearchPropertyTypes.length > 0"
              v-for="type in userSearchPropertyTypes"
              :label="type?.name || ''"
              :key="type?.id"
            />
            <span v-else class="pl-2">{{ $t("userProfile.noData") }}</span>
          </AppCard>

          <AppCard
            class="flex-1 space-y-3 text-sm text-gray-700"
            :title="$t('userProfile.compatibility.title')"
          >
            <strong class="mb-2 block text-gray-900"
              >{{ $t("userProfile.compatibility.noise") }}:</strong
            >
            <PropertyAmenity
              v-if="userNoiseCompatibility.length > 0"
              v-for="noise in userNoiseCompatibility"
              :label="noise?.name || ''"
              :key="noise?.id"
            />
            <span v-else class="pl-2">{{ $t("userProfile.noData") }}</span>

            <strong class="mb-2 block text-gray-900"
              >{{ $t("userProfile.compatibility.pets") }}:</strong
            >
            <PropertyAmenity
              v-if="userPetsCompatibility.length > 0"
              v-for="pet in userPetsCompatibility"
              :label="pet?.name || ''"
              :key="pet?.id || ''"
            />
            <span v-else class="pl-2">{{ $t("userProfile.noData") }}</span>
          </AppCard>
        </div>

        <AppCard
          :title="$t('userProfile.moodboard.title')"
          v-if="user.moodboardImages.length > 0"
        >
          <div class="grid grid-cols-2 gap-2 md:grid-cols-3">
            <NuxtImg
              v-for="(img, idx) in user.moodboardImages"
              :key="idx"
              :src="img"
              class="h-40 w-full rounded object-cover md:h-52"
            />
          </div>
        </AppCard>

        <AppCard :title="$t('userProfile.contact.title')">
          <div class="text-sm text-gray-700">
            <p>
              <strong>{{ $t("userProfile.contact.email") }}:</strong>
              {{ user.contactEmail || $t("userProfile.noData") }}
            </p>
            <p>
              <strong>{{ $t("userProfile.contact.phone") }}:</strong>
              {{ user.phone || $t("userProfile.noData") }}
            </p>
          </div>

          <div class="mt-4 flex flex-col gap-3 md:flex-row">
            <Button
              asChild
              v-slot="slotProps"
              severity="secondary"
              :label="$t('userProfile.contact.sendEmail')"
              icon="pi pi-envelope"
              v-if="user.contactEmail"
            >
              <a :href="`mailto:${user.contactEmail}`" :class="slotProps.class">
                {{ $t("userProfile.contact.sendEmail") }}
              </a>
            </Button>
            <Button
              asChild
              v-slot="slotProps"
              :label="$t('userProfile.contact.call')"
              icon="pi pi-phone"
              v-if="user.phone"
            >
              <a :href="`tel:${user.phone}`" :class="slotProps.class">
                {{ $t("userProfile.contact.call") }}
              </a>
            </Button>
          </div>
        </AppCard>
      </div>

      <Divider />

      <p class="text-sm text-gray-600">
        {{ $t("userProfile.createdAt") }}
        <span class="font-medium">{{ formatDate(user.createdAt) }}</span>
      </p>

      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-600">ID: {{ user.id }}</span>

        <AppEntityReport entity="user" :entity-id="user.id" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from "@prisma/client";

type FullUser = User & {
  isBookmarked?: boolean;
};

const { data } = useAuth();

const { user: userProp, editable } = defineProps<{
  user: FullUser;
  editable: boolean;
}>();

const user = ref(userProp);
const isProfileImageVisible = ref(false);

const taxonomies = useTaxonomies();

const userInterests = computed(() => {
  return user.value.interests
    .map((id) => taxonomies.interestsOptions.find((i) => i.id === id))
    .filter(Boolean);
});

const userOccupations = computed(() => {
  return user.value.occupations
    .map((id) => taxonomies.occupationsOptions.find((o) => o.id === id))
    .filter(Boolean);
});

const userSearchPreferences = computed(() => {
  return user.value.searchPreferences
    .map((id) => taxonomies.searchPreferencesOptions.find((s) => s.id === id))
    .filter(Boolean);
});

const userSearchPropertyTypes = computed(() => {
  return user.value.searchPropertyTypes
    .map((id) => taxonomies.searchPropertyTypesOptions.find((t) => t.id === id))
    .filter(Boolean);
});

const userNoiseCompatibility = computed(() => {
  return user.value.noiseCompatibility
    .map((id) => taxonomies.noiseCompatibilityOptions.find((n) => n.id === id))
    .filter(Boolean);
});

const userPetsCompatibility = computed(() => {
  return user.value.petsCompatibility
    .map((id) => taxonomies.petsCompatibilityOptions.find((p) => p.id === id))
    .filter(Boolean);
});

const onUploadImg = async (res: any, field: keyof User) => {
  if (!user.value || !editable) return;

  user.value[field] = res[0];

  await useFetch("/api/user/update", {
    method: "POST",
    body: {
      [field]: res[0],
    },
  });
};

const onDeleteImg = async (field: keyof User) => {
  if (!user.value || !editable) return;

  user.value[field] = null;
};

function formatCurrency(v: number) {
  return v.toLocaleString("pl-PL", { style: "currency", currency: "PLN" });
}
</script>
