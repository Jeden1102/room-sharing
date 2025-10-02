<template>
  <div class="min-h-screen" v-if="usr">
    <div class="relative">
      <div class="relative">
        <NuxtImg
          class="h-40 w-full rounded-md object-cover md:h-52"
          :src="usr.bgImage || '/images/user/bg-placeholder.webp'"
          alt="cover"
        />
        <FormFileUploaderDialog
          v-model="usr.bgImage"
          id="bgImage"
          name="bgImage"
          title="Background Image"
          entity="user"
          field="bgImage"
          class="absolute top-4 right-4"
          @upload="(res) => onUploadImg(res, 'bgImage')"
          @delete="() => (usr.bgImage = null)"
        />
      </div>

      <div
        class="absolute bottom-0 left-4 flex w-[calc(100%-2rem)] translate-y-1/2 transform items-end gap-6"
      >
        <div class="relative flex w-full justify-between gap-2">
          <div class="relative">
            <NuxtImg
              :src="usr.profileImage || '/images/user/avatar-placeholder.webp'"
              alt="profile"
              class="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
            />

            <FormFileUploaderDialog
              v-model="usr.profileImage"
              id="profileImage"
              name="profileImage"
              title="Profile Image"
              entity="user"
              field="profileImage"
              class="absolute right-0 bottom-4"
              @upload="(res) => onUploadImg(res, 'profileImage')"
              @delete="() => (usr.bgImage = null)"
            />
          </div>

          <div class="mt-auto flex gap-2">
            <Button label="Wiadomość" icon="pi pi-comment" />
            <Button
              asChild
              v-slot="slotProps"
              rounded
              severity="secondary"
              icon="pi pi-heart"
            >
              <RouterLink to="/user/favorites" :class="slotProps.class">
                <span class="pi pi-heart"></span>
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
              {{ usr.firstName }} {{ usr.lastName }}
            </p>
            <p class="mt-2 text-sm text-gray-700">
              {{ usr.age }} lat • Warszawa, Mokotów @Todo
            </p>
          </div>

          <div class="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div class="card-base flex items-center gap-3">
              <i class="pi pi-user text-primary-500 text-xl"></i>
              <div>
                <div class="text-xs text-gray-500">Imię</div>
                <div class="font-medium">
                  {{ usr.firstName }} {{ usr.lastName }}
                </div>
              </div>
            </div>

            <div class="card card-base flex items-center gap-3">
              <i class="pi pi-briefcase text-primary-500 text-xl"></i>
              <div>
                <div class="text-xs text-gray-500">Zawód</div>
                <div class="font-medium">
                  <span
                    v-if="usr.occupation"
                    v-for="i in usr.occupation"
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
                  <span v-if="usr.budgetMax">
                    {{ formatCurrency(usr.budgetMax) }}
                  </span>
                  <span v-else>No data</span>
                </div>
              </div>
            </div>

            <div class="card-base flex items-center gap-3">
              <i class="pi pi-map-marker text-primary-500 text-xl"></i>
              <div>
                <div class="text-xs text-gray-500">Lokalizacja</div>
                <div class="font-medium">Warszwa, Mokotów@todo</div>
              </div>
            </div>

            <div class="card-base flex items-center gap-3">
              <Icon name="cil:smoke" class="text-primary-500 text-xl" />
              <div>
                <div class="text-xs text-gray-500">Osoba paląca</div>
                <div class="font-medium">{{ usr.smoker ? "Tak" : "Nie" }}</div>
              </div>
            </div>

            <div class="card-base flex items-center gap-3">
              <Icon
                name="material-symbols:pets"
                class="text-primary-500 text-xl"
              />
              <div>
                <div class="text-xs text-gray-500">Posiada zwierzęta</div>
                <div class="font-medium">{{ usr.pets ? "Tak" : "Nie" }}</div>
              </div>
            </div>
          </div>

          <div class="mt-2 text-sm text-gray-700" v-html="usr.description?.replaceAll('\n', '<br />')"></div>

          <div class="mt-4">
            <div class="flex flex-wrap gap-2">
              <Tag
                v-for="i in usr.interests"
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
                <ul class="list-inside list-disc" v-if="usr.searchPreferences">
                  <li v-for="i in usr.searchPreferences" :key="i.id">
                    {{ i.name }}
                  </li>
                </ul>
                <span v-else>No data</span>
              </div>
              <div>
                <strong>Typ mieszkania:</strong>
                <ul class="list-inside list-disc" v-if="usr.searchPropertyType">
                  <li v-for="i in usr.searchPropertyType" :key="i.id">
                    {{ i.name }}
                  </li>
                </ul>
                <span v-else>No data</span>
              </div>
              <p><strong>Dzielnica:</strong> Mokotów, Ursus @todo</p>
            </div>
          </div>

          <div class="card-base flex-1 p-6">
            <h2 class="text-lg font-semibold">Kompatybilność</h2>
            <div class="mt-3 flex flex-col gap-4 text-sm text-gray-600">
              <div>
                <strong>Preferencje dotyczące ciszy:</strong>
                <ul class="list-inside list-disc" v-if="usr.noiseCompatibility">
                  <li v-for="i in usr.noiseCompatibility" :key="i.id">
                    {{ i.name }}
                  </li>
                </ul>
                <span v-else>No data</span>
              </div>
              <div>
                <strong>Zwierzęta:</strong>
                <ul class="list-inside list-disc" v-if="usr.petsCompatibility">
                  <li v-for="i in usr.petsCompatibility" :key="i.id">
                    {{ i.name }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2 md:grid-cols-3">
          <NuxtImg
            v-for="(img, idx) in usr.moodboardImages"
            :key="idx"
            :src="img"
            class="h-40 w-full rounded object-cover md:h-52"
          />
        </div>

        <div class="card-base p-6">
          <h3 class="text-md mb-3 font-semibold">Kontakt</h3>
          <div class="text-sm text-gray-700">
            <p><strong>Email:</strong> {{ usr.email }}</p>
            <p><strong>Telefon:</strong> {{ usr.phone }}</p>
          </div>

          <div class="mt-4 flex flex-col gap-3 md:flex-row">
            <Button
              asChild
              v-slot="slotProps"
              severity="secondary"
              label="Wyślij e-mail"
              icon="pi pi-envelope"
            >
              <a :href="`mailto:${usr.email}`" :class="slotProps.class">
                Wyślij e-mail
              </a>
            </Button>
            <Button
              asChild
              v-slot="slotProps"
              label="Wyślij e-mail"
              icon="pi pi-envelope"
            >
              <a :href="`tel:${usr.phone}`" :class="slotProps.class">Zadzwoń</a>
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

definePageMeta({
  auth: true,
});

const usr = ref<FullUser | null>(null);
const res = await useFetch("/api/user/me");
usr.value = res.data.value.user;

console.log(usr.value)

const onUploadImg = async (res: any, field: keyof User) => {
  if (!usr.value) return;

  usr.value[field] = res[0];
  await useFetch("/api/user/update", {
    method: "POST",
    body: {
      [field]: res[0],
    },
  });
};

function formatCurrency(v: number) {
  return v.toLocaleString("pl-PL", { style: "currency", currency: "PLN" });
}
</script>
