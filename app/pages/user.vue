<script setup lang="ts"></script>

<template>
  <div>
    <nav class="flex gap-4 bg-gray-200 p-4">
      <NuxtLink to="/user/profile" active-class="font-bold text-blue-600"
        >Profile</NuxtLink
      >
      <NuxtLink to="/user/chat" active-class="font-bold text-blue-600"
        >Chat</NuxtLink
      >
      <NuxtLink to="/user/settings" active-class="font-bold text-blue-600"
        >Settings</NuxtLink
      >
    </nav>
    <div class="p-4">
      <NuxtPage />
    </div>
  </div>
</template>
