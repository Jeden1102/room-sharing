<template>
  <header class="bg-white p-4">
    <div class="container flex items-center lg:gap-12 xl:gap-24">
      <NuxtLink :to="$localePath('/')">
        <NuxtImg
          src="/logo.png"
          alt="logo"
          width="106"
          height="83"
          class="md:w-25"
        />
      </NuxtLink>
    </div>
  </header>
</template>
