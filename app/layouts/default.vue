<script setup lang="ts"></script>

<template>
  <div class="default pb-20 lg:pb-0 min-h-screen flex flex-col">
    <AppHeader />
    <slot />
    <AppBottomNavigation />
    <AppFooter />
  </div>
</template>
