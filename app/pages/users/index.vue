<template>
  <main class="container flex max-w-6xl flex-col gap-4 py-6">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-medium">Users listing</h1>
      <UsersFilters
        @update="applyFilters"
        class="md:hidden"
        :total="usersData?.total"
        :pending
      />
      <UsersSorting @update="applyFilters" class="hidden w-50 md:block" />
    </div>
    <!-- Users List -->
    <section class="flex flex-1 flex-col gap-6">
      <div v-if="pending" class="grid gap-4">
        <Skeleton height="6rem" v-for="i in 6" :key="i" />
      </div>

      <div v-else-if="usersData">
        <div class="grid gap-6">
          <UserTeaser
            v-for="user in usersData.users"
            :key="user.id"
            :user="user"
          />
        </div>

        <p v-if="usersData.users.length === 0" class="mt-4 text-gray-500">
          Brak wyników
        </p>

        <div class="mt-8 flex justify-center">
          <Paginator
            :rows="10"
            :totalRecords="usersData.total"
            :first="(filters.page - 1) * 10"
            @page="onPageChange"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const filters = ref({
  gender: null,
  city: "",
  nonSmoker: false,
  noPets: false,
  budgetMax: null,
  sortBy: "newest",
  page: 1,
});

const {
  data: usersData,
  pending,
  refresh,
} = await useFetch("/api/users", {
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
