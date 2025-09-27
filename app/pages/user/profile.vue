<template>
  <div class="min-h-screen" v-if="usr">
    <!-- Cover / Header -->
    <div class="relative">
      <img
        class="h-40 w-full rounded-md object-cover md:h-52"
        :src="user.coverImage"
        alt="cover"
      />
      <div
        class="absolute bottom-0 left-4 flex w-[calc(100%-2rem)] translate-y-1/2 transform items-end gap-6"
      >
        <div class="relative flex w-full justify-between gap-2">
          <NuxtImg
            :src="user.profileImage"
            alt="profile"
            class="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
          />

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
                <div class="font-medium">{{ usr.occupation }}</div>
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

          <p class="mt-2 text-sm text-gray-700">{{ usr.description }}</p>

          <div class="mt-4">
            <div class="flex flex-wrap gap-2">
              <Tag
                v-for="(i, idx) in usr.interests"
                :key="idx"
                class="capitalize"
                :value="i.name"
              />
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-4 md:flex-row">
          <div class="card-base p-6">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold">W poszukiwaniu</h2>
              <Badge :value="'Liczba miejsc: 2 @todo'" severity="info" />
            </div>

            <div class="mt-4 space-y-3 text-sm text-gray-700">
              <p>
                <strong>Preferencje:</strong>
                Spokojne, zorganizowane osoby, lubiące gotować razem @todo
              </p>
              <p>
                <strong>Typ mieszkania:</strong>
                Mieszkanie 3-pokojowe @todo
              </p>
              <p><strong>Dzielnica:</strong> Mokotów, Ursus @todo</p>
            </div>
          </div>

          <div class="card-base p-6">
            <h2 class="text-lg font-semibold">Kompatybilność</h2>
            <div class="mt-3 text-sm text-gray-600">
              <p>
                <strong>Preferencje dotyczące ciszy:</strong>
                niski poziom hałasu preferowany @todo
              </p>
              <p><strong>Zwierzęta:</strong> {{ compatibility.pets }} @todo</p>
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
import type { User } from "@prisma/client";

definePageMeta({
  auth: true,
});

const usr = ref<User | null>(null);
const res = await useFetch("/api/user/me");
usr.value = res.data.value.user;

const user = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  email: "jan.kowalski@example.com",
  firstName: "Jan",
  lastName: "Kowalski",
  displayName: "Janek",
  age: 22,
  gender: "male",
  bio: "Student architektury, szukam współlokatorów na spokojne wspólne mieszkanie. Lubię porządek, gotowanie i wieczory z planszówkami.",
  profileImage:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=60",
  coverImage:
    "https://images.unsplash.com/photo-1503264116251-35a269479413?w=1600&q=60",
  interests: ["sport", "muzyka", "podróże", "kuchnia"],
  lifestyle: "ranny",
  smoker: false,
  pets: true,
  occupation: "student",
  budgetMax: 2200,
  location: "Warszawa, Mokotów",
  moodboard: [
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=60",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=60",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=60",
  ],
  gallery: [
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&q=60",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=60",
    "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=800&q=60",
  ],
  verified: true,
  rating: 4.6,
  reviews: [
    {
      author: "Marta",
      authorImage: "https://i.pravatar.cc/40?img=5",
      date: "2024-05-12",
      text: "Świetny współlokator, zawsze punktualny z opłatami.",
    },
    {
      author: "Kamil",
      authorImage: "https://i.pravatar.cc/40?img=12",
      date: "2024-02-01",
      text: "Dobra komunikacja, porządek w mieszkaniu.",
    },
  ],
  emailVerified: true,
  phone: "+48 600 700 800",
  searching: {
    openSpots: 2,
    who: "Studentki lub studenci, najlepiej niepalący",
    preferences: "Spokojne, zorganizowane osoby, lubiące gotować razem",
    propertyType: "Mieszkanie 3-pokojowe",
    district: "Mokotów / Sadyba",
  },
};

const compatibility = {
  lifestyle: "80% zgodności",
  noise: "niski poziom hałasu preferowany",
  pets: "akceptuje koty i małe psy",
};

function formatCurrency(v: number) {
  return v.toLocaleString("pl-PL", { style: "currency", currency: "PLN" });
}
</script>
