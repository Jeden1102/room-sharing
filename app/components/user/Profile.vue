<template>
  <div class="min-h-screen">
    <div class="relative">
      <div class="relative">
        <NuxtImg
          class="h-40 w-full rounded-md object-cover md:h-52"
          :src="user.bgImage || '/images/user/bg-placeholder.webp'"
          alt="cover"
        />
        <FormFileUploaderDialog
          v-if="editable"
          v-model="user.bgImage"
          id="bgImage"
          name="bgImage"
          title="Background Image"
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
              alt="profile"
              class="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
            />

            <FormFileUploaderDialog
              v-if="editable"
              v-model="user.profileImage"
              id="profileImage"
              name="profileImage"
              title="Profile Image"
              entity="user"
              field="profileImage"
              class="absolute right-0 bottom-4"
              @upload="(res) => onUploadImg(res, 'profileImage')"
              @delete="() => onDeleteImg('profileImage')"
            />
          </div>

          <div class="mt-auto flex gap-2">
            <Button icon="pi pi-comment" rounded />
            <Button
              asChild
              v-slot="slotProps"
              rounded
              severity="secondary"
              icon="pi pi-bookmark"
            >
              <RouterLink to="/user/favorites" :class="slotProps.class">
                <span class="pi pi-bookmark"></span>
              </RouterLink>
            </Button>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-auto mt-24">
      <div class="flex flex-col gap-6">
        <div class="space-y-6">
          <div>
            <p class="text-lg font-semibold text-gray-600">
              {{ user.firstName }} {{ user.lastName }}
            </p>
            <p class="mt-2 text-sm text-gray-700">
              {{ user.age }} lat • {{ user.city }}
              <template v-if="user.districts.length > 0">
                | {{ user.districts.join(", ") }}
              </template>
            </p>
          </div>

          <div class="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div class="card-base flex items-center gap-3">
              <i class="pi pi-user text-primary-500 text-xl"></i>
              <div>
                <div class="text-xs text-gray-500">Imię</div>
                <div class="font-medium" v-if="user.firstName && user.lastName">
                  {{ user.firstName }} {{ user.lastName }}
                </div>
                <div class="font-medium" v-else>No data</div>
              </div>
            </div>

            <div class="card card-base flex items-center gap-3">
              <i class="pi pi-briefcase text-primary-500 text-xl"></i>
              <div>
                <div class="text-xs text-gray-500">Zawód</div>
                <div class="font-medium">
                  <span
                    v-if="user.occupation.length > 0"
                    v-for="i in user.occupation"
                    :key="i.id"
                    >{{ i.name }}</span
                  >
                  <span v-else>No data</span>
                </div>
              </div>
            </div>

            <div class="card-base flex items-center gap-3">
              <i class="pi pi-wallet text-primary-500 text-xl"></i>
              <div>
                <div class="text-xs text-gray-500">Budżet maks.</div>
                <div class="font-medium">
                  <span v-if="user.budgetMax">
                    {{ formatCurrency(user.budgetMax) }}
                  </span>
                  <span v-else>No data</span>
                </div>
              </div>
            </div>

            <div class="card-base flex items-center gap-3">
              <i class="pi pi-map-marker text-primary-500 text-xl"></i>
              <div>
                <div class="text-xs text-gray-500">Poszukiwana lokalizacja</div>
                <div class="font-medium" v-if="user.city">
                  {{ user.city }}
                  <template v-if="user.districts.length > 0">
                    | {{ user.districts.join(", ") }}
                  </template>
                </div>
                <div class="font-medium" v-else>No data</div>
              </div>
            </div>

            <div class="card-base flex items-center gap-3">
              <Icon name="cil:smoke" class="text-primary-500 text-xl" />
              <div>
                <div class="text-xs text-gray-500">Osoba paląca</div>
                <div class="font-medium">{{ user.smoker ? "Tak" : "Nie" }}</div>
              </div>
            </div>

            <div class="card-base flex items-center gap-3">
              <Icon
                name="material-symbols:pets"
                class="text-primary-500 text-xl"
              />
              <div>
                <div class="text-xs text-gray-500">Posiada zwierzęta</div>
                <div class="font-medium">{{ user.pets ? "Tak" : "Nie" }}</div>
              </div>
            </div>
          </div>

          <div
            v-if="user.description"
            class="mt-2 text-sm text-gray-700"
            v-html="user.description?.replaceAll('\n', '<br />')"
          ></div>

          <div class="mt-4" v-if="user.interests.length > 0">
            <div class="flex flex-wrap gap-2">
              <Tag
                v-for="i in user.interests"
                :key="i.id"
                class="capitalize"
                :value="i.name"
              />
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-4 md:flex-row">
          <div class="card-base flex-1 p-6">
            <h2 class="text-lg font-semibold">W poszukiwaniu</h2>

            <div class="mt-4 space-y-3 text-sm text-gray-700">
              <div>
                <strong>Preferencje:</strong>
                <ul
                  class="list-inside list-disc"
                  v-if="user.searchPreferences.length > 0"
                >
                  <li v-for="i in user.searchPreferences" :key="i.id">
                    {{ i.name }}
                  </li>
                </ul>
                <span v-else class="pl-2">No data</span>
              </div>
              <div>
                <strong>Typ mieszkania:</strong>
                <ul
                  class="list-inside list-disc"
                  v-if="user.searchPropertyType.length > 0"
                >
                  <li v-for="i in user.searchPropertyType" :key="i.id">
                    {{ i.name }}
                  </li>
                </ul>
                <span v-else class="pl-2">No data</span>
              </div>
            </div>
          </div>

          <div class="card-base flex-1 p-6">
            <h2 class="text-lg font-semibold">Kompatybilność</h2>
            <div class="mt-3 flex flex-col gap-4 text-sm text-gray-600">
              <div>
                <strong>Preferencje dotyczące ciszy:</strong>
                <ul
                  class="list-inside list-disc"
                  v-if="user.noiseCompatibility.length > 0"
                >
                  <li v-for="i in user.noiseCompatibility" :key="i.id">
                    {{ i.name }}
                  </li>
                </ul>
                <span v-else class="pl-2">No data</span>
              </div>
              <div>
                <strong>Zwierzęta:</strong>
                <ul
                  class="list-inside list-disc"
                  v-if="user.petsCompatibility.length > 0"
                >
                  <li v-for="i in user.petsCompatibility" :key="i.id">
                    {{ i.name }}
                  </li>
                </ul>
                <span v-else class="pl-2">No data</span>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2 md:grid-cols-3">
          <NuxtImg
            v-for="(img, idx) in user.moodboardImages"
            :key="idx"
            :src="img"
            class="h-40 w-full rounded object-cover md:h-52"
          />
        </div>

        <div class="card-base p-6">
          <h3 class="text-md mb-3 font-semibold">Kontakt</h3>
          <div class="text-sm text-gray-700">
            <p><strong>Email:</strong> {{ user.email || "No data" }}</p>
            <p><strong>Telefon:</strong> {{ user.phone || "No data" }}</p>
          </div>

          <div class="mt-4 flex flex-col gap-3 md:flex-row">
            <Button
              asChild
              v-slot="slotProps"
              severity="secondary"
              label="Wyślij e-mail"
              icon="pi pi-envelope"
              v-if="user.email"
            >
              <a :href="`mailto:${user.email}`" :class="slotProps.class">
                Wyślij e-mail
              </a>
            </Button>
            <Button
              asChild
              v-slot="slotProps"
              label="Wyślij e-mail"
              icon="pi pi-envelope"
              v-if="user.phone"
            >
              <a :href="`tel:${user.phone}`" :class="slotProps.class"
                >Zadzwoń</a
              >
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User, Prisma } from "@prisma/client";

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
}>;

const { user: userProp, editable } = defineProps<{
  user: FullUser;
  editable: boolean;
}>();

const user = ref(userProp);

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
