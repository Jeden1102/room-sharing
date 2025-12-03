<template>
  <nav class="bg-white py-4 lg:px-4">
    <div class="container flex items-center lg:gap-12 xl:gap-24">
      <div class="flex w-full justify-between lg:w-fit">
        <NuxtLink :to="$localePath('index')">
          <NuxtImg
            src="/logo.png"
            :alt="$t('nav.home')"
            width="100"
            height="79"
            class="w-20 md:w-25"
          />
        </NuxtLink>

        <Button
          class="lg:!hidden"
          rounded
          severity="secondary"
          :icon="isMenuOpened ? 'pi pi-times' : 'pi pi-bars'"
          @click="isMenuOpened = !isMenuOpened"
          :title="$t('nav.toggleMenu')"
        />
      </div>

      <div
        :class="
          clsx(
            {
              '!pointer-events-auto z-20 translate-y-0 opacity-100':
                isMenuOpened,
            },
            'pointer-events-none absolute top-20 left-0 z-10 flex size-full w-full -translate-y-4 flex-col justify-between bg-white p-4 opacity-0 transition-all duration-300 lg:pointer-events-auto lg:static lg:translate-y-0 lg:flex-row lg:items-center lg:p-0 lg:opacity-100',
          )
        "
      >
        <div
          class="flex h-[calc(100%-6rem)] flex-col gap-3 lg:h-auto lg:flex-row lg:gap-6 xl:gap-12"
        >
          <NuxtLink class="nav-link" :to="$localePath('index')">
            {{ $t("nav.home") }}
          </NuxtLink>
          <NuxtLink class="nav-link" :to="$localePath('properties-filters')">
            {{ $t("nav.properties") }}
          </NuxtLink>
          <NuxtLink class="nav-link" :to="$localePath('users')">
            {{ $t("nav.users") }}
          </NuxtLink>
          <NuxtLink class="nav-link" :to="$localePath('contact')">
            {{ $t("nav.contact") }}
          </NuxtLink>
          <NuxtLink
            class="nav-link lg:hidden"
            v-if="data?.user"
            @click="() => signOut()"
          >
            {{ $t("nav.logout") }}
          </NuxtLink>
          <AppLanguageSwitcher class="mt-auto lg:hidden" />
        </div>

        <div class="hidden items-center gap-6 lg:flex">
          <template v-if="!data?.user">
            <Button asChild v-slot="slotProps" severity="secondary">
              <RouterLink
                :to="$localePath('/auth/login')"
                :class="slotProps.class"
              >
                {{ $t("nav.login") }}
              </RouterLink>
            </Button>
          </template>

          <template v-else>
            <Button
              severity="secondary"
              rounded
              icon="pi pi-user"
              @click="toggleUserMenu"
              ref="userButton"
              :title="$t('nav.profile')"
            >
            </Button>

            <Menu ref="userMenu" :model="userMenuItems" :popup="true" />
          </template>

          <Button asChild v-slot="slotProps">
            <RouterLink
              :to="
                $localePath(
                  data?.user ? '/new-property' : '/auth/login?feat=newProperty',
                )
              "
              :class="slotProps.class"
            >
              {{ $t("nav.addProperty") }}
            </RouterLink>
          </Button>

          <AppBookmarkCount />

          <AppLanguageSwitcher />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { clsx } from "clsx";

const { data, signOut } = useAuth();
const { t } = useI18n();
const isMenuOpened = ref(false);
const localePath = useLocalePath();
const userMenu = ref();
const userButton = ref();
const route = useRoute();

watch(
  () => route.path,
  () => {
    isMenuOpened.value = false;
  },
);

watch(
  () => isMenuOpened.value,
  () => {
    document.body.classList.toggle("!overflow-hidden");
  },
);

const toggleUserMenu = (event: Event) => {
  userMenu.value.toggle(event);
};

const userMenuItems = computed(() => [
  {
    label: t("nav.profile"),
    icon: "pi pi-user",
    command: () => navigateTo(localePath("/user/profile")),
  },
  {
    label: t("nav.logout"),
    icon: "pi pi-sign-out",
    command: () => signOut(),
  },
]);
</script>
