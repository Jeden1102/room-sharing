<template>
  <div class="bg-white py-4 lg:px-4">
    <div class="container flex items-center lg:gap-12 xl:gap-24">
      <div class="flex w-full justify-between lg:w-fit">
        <NuxtLink to="/">
          <NuxtImg src="/logo.svg" alt="logo" width="162" height="32" />
        </NuxtLink>

        <Button
          class="lg:!hidden"
          rounded
          severity="secondary"
          :icon="isMenuOpened ? 'pi pi-times' : 'pi pi-bars'"
          @click="isMenuOpened = !isMenuOpened"
        />
      </div>

      <div
        :class="
          clsx(
            { 'pointer-events-auto translate-y-0 opacity-100': isMenuOpened },
            'pointer-events-none absolute top-16 left-0 z-10 flex size-full w-full -translate-y-4 flex-col justify-between bg-white p-4 opacity-0 transition-all duration-300 md:pointer-events-auto lg:static lg:translate-y-0 lg:flex-row lg:items-center lg:p-0 lg:opacity-100',
          )
        "
      >
        <div
          class="flex h-[calc(100%-6rem)] flex-col gap-3 lg:h-auto lg:flex-row lg:gap-6 xl:gap-12"
        >
          <NuxtLink class="nav-link" :to="$localePath('index')">Home</NuxtLink>
          <NuxtLink class="nav-link" :to="$localePath('properties')"
            >Properties</NuxtLink
          >
          <NuxtLink class="nav-link" to="/users">Users</NuxtLink>
          <NuxtLink class="nav-link" to="/users">Product</NuxtLink>
          <NuxtLink class="nav-link" to="/contact">Contact</NuxtLink>
          <AppLanguageSwitcher class="mt-auto lg:hidden" />
        </div>

        <div class="hidden items-center gap-6 lg:flex">
          <Button asChild v-slot="slotProps" severity="secondary">
            <RouterLink to="/user/login" :class="slotProps.class"
              >Login</RouterLink
            >
          </Button>

          <Button asChild v-slot="slotProps">
            <RouterLink to="/new-publication" :class="slotProps.class"
              >Add new publication</RouterLink
            >
          </Button>

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

          <AppLanguageSwitcher />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { clsx } from "clsx";

const isMenuOpened = ref(false);
</script>
