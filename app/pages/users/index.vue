<template>
  <main class="container flex flex-col gap-4 py-6">
    <div
      class="flex items-center justify-between md:mb-4 md:grid md:grid-cols-2 md:gap-8"
    >
      <h1 class="text-xl font-medium md:text-2xl">Users listing</h1>
      <UsersSorting
        @update="applyFilters"
        class="ml-auto hidden w-50 md:block"
      />
      <UsersFilters
        @update="applyFilters"
        :total="usersData?.total"
        :pending
        class="col-span-2"
      />
    </div>
    <!-- Users List -->
    <section>
      <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <UserTeaserLoader v-if="pending" v-for="i in 6" :key="i" />
        <UserTeaser
          v-else-if="usersData"
          v-for="user in usersData.users"
          :key="user.id"
          :user="user"
        />
      </div>

      <p v-if="usersData?.users.length === 0" class="mt-4 text-gray-500">
        Brak wyników
      </p>

      <Paginator
        v-if="(usersData?.total || 0) > 0"
        class="mt-8"
        :rows="10"
        :totalRecords="usersData?.total"
        :first="(filters.page - 1) * 10"
        @page="onPageChange"
      />
    </section>
  </main>
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
}>;

usePageSeo({
  title: "seo.users.title",
  description: "seo.users.description",
});

const filters = ref({
  gender: null,
  city: "",
  nonSmoker: false,
  noPets: false,
  budgetMax: null,
  sortBy: "newest",
  page: 1,
});

const { data: usersData, pending } = await useFetch<{
  users: FullUser[];
  total: number;
}>("/api/users", {
  query: filters,
  watch: [filters],
});

const applyFilters = (newFilters: any) => {
  filters.value = { ...filters.value, ...newFilters, page: 1 };
};

const onPageChange = (event: any) => {
  filters.value.page = Math.floor(event.first / event.rows) + 1;
};
</script>
