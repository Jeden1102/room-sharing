<template>
  <div class="flex min-h-screen flex-col">
    <NuxtLoadingIndicator :height="4" color="#00509d" />
    <AppHeader class="hidden md:block" />
    <slot />
    <AppFooter class="hidden md:block" />
  </div>
</template>
