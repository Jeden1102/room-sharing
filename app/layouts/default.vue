<template>
  <div class="default flex min-h-screen flex-col pb-20 lg:pb-0">
    <NuxtLoadingIndicator :height="4" color="#00509d" />
    <AppHeader />
    <slot />
    <AppBottomNavigation />
    <AppFooter />
  </div>
</template>
