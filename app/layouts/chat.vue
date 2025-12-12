<template>
  <NuxtLoadingIndicator :height="4" color="#00509d" />
  <AppHeader class="hidden md:block" />
  <slot />
  <AppFooter class="hidden md:block" />
</template>
