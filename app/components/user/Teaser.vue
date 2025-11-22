<template>
  <div
    class="card-base group relative overflow-hidden rounded-xl px-0 pt-0 shadow-md transition"
  >
    <div class="relative h-40 w-full">
      <img
        :src="user.bgImage || '/images/user/bg-placeholder.webp'"
        alt="user background"
        class="h-full w-full rounded-t-xl object-cover"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
      ></div>

      <img
        :src="user.profileImage || '/images/user/avatar-placeholder.webp'"
        alt="user avatar"
        class="absolute bottom-2 left-2 h-16 w-16 rounded-full border-2 border-white object-cover shadow-md"
      />
    </div>

    <div class="space-y-3 p-4 pb-1.5">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-gray-900">
            {{ user.firstName }} {{ user.lastName }}
            <span v-if="user.age" class="ml-2 text-sm text-gray-500">{{
              user.age
            }}</span>
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
          <i class="pi pi-wallet text-gray-600"></i> do {{ user.budgetMax }} zł
        </div>
      </div>

      <div class="flex items-center justify-between pt-3">
        <Button
          asChild
          v-slot="slotProps"
          label="Zobacz profil"
          size="small"
          class="rounded-full text-sm"
        >
          <RouterLink
            :to="
              $localePath({
                name: 'users-id',
                params: {
                  id: `${user.firstName?.toLowerCase()}-${user.lastName?.toLowerCase()}`,
                },
                query: { id: user.id },
              })
            "
            :class="slotProps.class"
          >
            Zobacz profil
          </RouterLink>
        </Button>

        <Button icon="pi pi-comments" severity="secondary" rounded />
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
import type { Prisma } from "@prisma/client";

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
</script>
