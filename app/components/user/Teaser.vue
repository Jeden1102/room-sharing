<template>
  <div
    class="card-base group relative flex h-full flex-col overflow-hidden rounded-xl px-0 pt-0 pb-2 shadow-md transition"
  >
    <div class="relative h-40 w-full">
      <img
        :src="user.bgImage || '/images/user/bg-placeholder.webp'"
        :alt="$t('userTeaser.bgImageAlt')"
        class="h-full w-full rounded-t-xl object-cover"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
      ></div>

      <img
        :src="user.profileImage || '/images/user/avatar-placeholder.webp'"
        :alt="$t('userTeaser.avatarAlt')"
        class="absolute bottom-2 left-2 h-16 w-16 rounded-full border-2 border-white object-cover shadow-md"
      />
    </div>

    <div class="flex flex-1 flex-col space-y-3 p-4 pb-1.5">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-gray-900">
            <NuxtLink :to="uri">
              {{ user.firstName }} {{ user.lastName }}
              <span v-if="user.age" class="ml-2 text-sm text-gray-500">{{
                user.age
              }}</span>
            </NuxtLink>
          </h3>
          <p class="mt-2 flex items-center gap-1 text-xs text-gray-500">
            <i class="pi pi-map-marker text-gray-600"></i>
            {{ user.city
            }}<span v-if="user.districts?.length">
              – {{ user.districts[0] }}</span
            >
          </p>
        </div>
        <Tag :value="user.gender" severity="info" class="text-xs font-medium" />
      </div>

      <div class="flex flex-wrap gap-2 text-xs text-gray-600">
        <div class="flex items-center gap-2" v-if="user.budgetMax">
          <i class="pi pi-wallet text-gray-600"></i>
          {{ $t("userTeaser.budgetUpTo") }} {{ user.budgetMax }}
          {{ $t("userTeaser.currency") }}
        </div>
      </div>

      <div class="mt-auto flex items-center justify-between pt-3">
        <Button icon="pi pi-comments" severity="secondary" rounded />

        <Button
          asChild
          v-slot="slotProps"
          :label="$t('userTeaser.viewProfile')"
          class="rounded-full text-sm"
        >
          <RouterLink :to="uri" :class="slotProps.class">
            {{ $t("userTeaser.viewProfile") }}
          </RouterLink>
        </Button>
      </div>
    </div>

    <AppEntityBookmark
      entity-type="user"
      :entity-id="user.id"
      :initial-bookmarked="user.isBookmarked"
      button-class="!absolute top-2 right-2 z-10"
      v-if="data?.user?.id !== user.id"
    />
  </div>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";
import type { Prisma } from "@prisma/client";

const localePath = useLocalePath();

type FullUser = Prisma.UserGetPayload<{
  include: {
    searchPreferences: true;
    searchPropertyType: true;
    interests: true;
    occupation: true;
    properties: true;
    noiseCompatibility: true;
    petsCompatibility: true;
  };
}> & {
  isBookmarked?: boolean;
};

const { data } = useAuth();

const props = defineProps<{
  user: FullUser;
}>();

const uri = computed(() => {
  return localePath({
    name: "users-id",
    params: {
      id: `${props.user.firstName?.toLowerCase()}-${props.user.lastName?.toLowerCase()}`,
    },
    query: { id: props.user.id },
  });
});
</script>
