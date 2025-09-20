<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Cover / Header -->
    <div class="relative">
      <img
        class="h-56 w-full object-cover"
        :src="user.coverImage"
        alt="cover"
      />
      <div
        class="absolute bottom-0 left-6 flex translate-y-1/2 transform items-end gap-6"
      >
        <div class="relative">
          <NuxtImg
            :src="user.profileImage"
            alt="profile"
            class="h-40 w-40 rounded-full border-4 border-white object-cover shadow-lg"
          />
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="container mx-auto mt-24 px-6">
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <!-- Left column: profile + basic info -->
        <div class="space-y-6 lg:col-span-4">
          <div class="p-4 text-center">
            <p class="text-lg font-semibold text-gray-600">
              {{ user.firstName }} {{ user.lastName }}
            </p>
            <p class="mt-2 text-sm text-gray-700">
              {{ user.age }} lat • {{ user.location }}
            </p>
          </div>

          <div>
            <div class="grid grid-cols-3 gap-2">
              <NuxtImg
                v-for="(img, idx) in user.gallery"
                :key="idx"
                :src="img"
                class="h-24 w-full rounded object-cover"
              />
            </div>
          </div>

          <div>
            <h2 class="text-lg font-semibold">O mnie</h2>
            <p class="mt-2 text-sm text-gray-700">{{ user.bio }}</p>

            <div class="mt-4">
              <div class="flex flex-wrap gap-2">
                <Tag
                  v-for="(i, idx) in user.interests"
                  :key="idx"
                  class="capitalize"
                  :value="i"
                />
              </div>
            </div>

            <div class="mt-4 space-y-2 text-sm text-gray-600">
              <p><strong>Styl życia:</strong> {{ user.lifestyle }}</p>
              <p><strong>Palenie:</strong> {{ user.smoker ? "Tak" : "Nie" }}</p>
              <p><strong>Zwierzęta:</strong> {{ user.pets ? "Tak" : "Nie" }}</p>
            </div>
          </div>

          <div>
            <h3 class="text-md mb-3 font-semibold">Moodboard</h3>
            <div class="grid grid-cols-3 gap-2">
              <img
                v-for="(m, idx) in user.moodboard"
                :key="idx"
                :src="m"
                class="h-24 w-full rounded object-cover"
              />
            </div>
          </div>

          <div>
            <h3 class="text-md mb-3 font-semibold">Kontakt</h3>
            <div class="text-sm text-gray-700">
              <p><strong>Email:</strong> {{ user.email }}</p>
              <p><strong>Telefon:</strong> {{ user.phone }}</p>
            </div>

            <div class="mt-4 flex gap-3">
              <Button
                label="Napisz wiadomość"
                icon="pi pi-envelope"
                class="p-button-outlined"
              />
              <Button
                label="Zaproś do znajomych"
                icon="pi pi-user-plus"
                class="p-button-secondary"
              />
            </div>
          </div>
        </div>

        <!-- Middle column: practical info + "W poszukiwaniu" -->
        <div class="space-y-6 lg:col-span-5">
          <div>
            <h2 class="text-lg font-semibold">Szczegóły</h2>
            <div class="mt-4 grid grid-cols-2 gap-4">
              <div
                class="flex items-center gap-3 rounded bg-white p-3 shadow-sm"
              >
                <i class="pi pi-user text-xl text-indigo-600"></i>
                <div>
                  <div class="text-xs text-gray-500">Imię</div>
                  <div class="font-medium">
                    {{ user.firstName }} {{ user.lastName }}
                  </div>
                </div>
              </div>

              <div
                class="flex items-center gap-3 rounded bg-white p-3 shadow-sm"
              >
                <i class="pi pi-briefcase text-xl text-green-600"></i>
                <div>
                  <div class="text-xs text-gray-500">Zawód</div>
                  <div class="font-medium">{{ user.occupation }}</div>
                </div>
              </div>

              <div
                class="flex items-center gap-3 rounded bg-white p-3 shadow-sm"
              >
                <i class="pi pi-wallet text-xl text-yellow-600"></i>
                <div>
                  <div class="text-xs text-gray-500">Budżet maks.</div>
                  <div class="font-medium">
                    {{ formatCurrency(user.budgetMax) }}
                  </div>
                </div>
              </div>

              <div
                class="flex items-center gap-3 rounded bg-white p-3 shadow-sm"
              >
                <i class="pi pi-map-marker text-xl text-pink-600"></i>
                <div>
                  <div class="text-xs text-gray-500">Lokalizacja</div>
                  <div class="font-medium">{{ user.location }}</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold">W poszukiwaniu</h2>
              <Badge
                :value="user.searching.openSpots + ' wolne'"
                severity="info"
              />
            </div>

            <div class="mt-4 space-y-3 text-sm text-gray-700">
              <p><strong>Kogo szuka:</strong> {{ user.searching.who }}</p>
              <p>
                <strong>Preferencje:</strong> {{ user.searching.preferences }}
              </p>
              <p>
                <strong>Typ mieszkania:</strong>
                {{ user.searching.propertyType }}
              </p>
              <p><strong>Dzielnica:</strong> {{ user.searching.district }}</p>
            </div>

            <div class="mt-4">
              <h3 class="mb-2 text-sm font-semibold">Przykładowe mieszkanie</h3>
              <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div class="col-span-1 overflow-hidden rounded shadow-sm">
                  <img
                    :src="exampleProperty.image"
                    class="h-40 w-full object-cover"
                  />
                </div>
                <div class="col-span-1">
                  <div class="font-semibold">{{ exampleProperty.title }}</div>
                  <div class="text-xs text-gray-500">
                    {{ exampleProperty.address }}
                  </div>
                  <div class="mt-2 text-sm">
                    {{ exampleProperty.description }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 class="text-lg font-semibold">Kompatybilność</h2>
            <div class="mt-3 text-sm text-gray-600">
              <p>
                <strong>Styl życia dopasowania:</strong>
                {{ compatibility.lifestyle }}
              </p>
              <p>
                <strong>Preferencje dotyczące ciszy:</strong>
                {{ compatibility.noise }}
              </p>
              <p><strong>Zwierzęta:</strong> {{ compatibility.pets }}</p>
            </div>
          </div>
        </div>

        <!-- Right column: reviews + actions -->
        <div class="space-y-6 lg:col-span-3">
          <div>
            <div class="flex items-center justify-between">
              <h3 class="text-md font-semibold">Ocena</h3>
              <div class="text-right">
                <div class="text-xl font-bold">{{ user.rating }} / 5</div>
                <div class="text-xs text-gray-500">
                  Na podstawie {{ user.reviews.length }} opinii
                </div>
              </div>
            </div>

            <div class="mt-4 space-y-3">
              <div
                v-for="(r, idx) in user.reviews"
                :key="idx"
                class="rounded bg-white p-3 shadow-sm"
              >
                <div class="flex items-start gap-3">
                  <NuxtImg
                    :src="r.authorImage"
                    class="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <div class="text-sm font-medium">{{ r.author }}</div>
                    <div class="text-xs text-gray-500">{{ r.date }}</div>
                    <div class="mt-2 text-sm">{{ r.text }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-md mb-3 font-semibold">Akcje</h3>
            <div class="flex flex-col gap-3">
              <Button label="Napisz wiadomość" icon="pi pi-comment" />
              <Button
                label="Zaproponuj zamieszkanie"
                icon="pi pi-home"
                class="p-button-success"
              />
              <Button
                label="Dodaj do ulubionych"
                icon="pi pi-heart"
                class="p-button-help"
              />
            </div>
          </div>

          <div>
            <h3 class="text-md mb-3 font-semibold">Weryfikacje</h3>
            <div class="flex flex-col gap-2 text-sm text-gray-600">
              <div class="flex items-center gap-2">
                <i class="pi pi-id-div"></i> Email potwierdzony
              </div>
              <div class="flex items-center gap-2">
                <i class="pi pi-phone"></i> Numer telefonu potwierdzony
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: true,
});

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

const exampleProperty = {
  image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=60",
  title: "Przestronne 3-pokojowe na Mokotowie",
  address: "Mokotów, ul. Dobra",
  description:
    "Dobre doświetlenie, blisko tramwaju, 10 min do uczelni. Kuchnia w pełni wyposażona.",
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

<style scoped>
.p-div {
  background: transparent;
}
</style>
