<template>
  <div class="flex flex-col lg:min-h-screen lg:pb-0">
    <AppHeaderSimple />

    <div
      class="flex flex-col gap-10 pt-10 lg:container lg:flex-1 lg:flex-row lg:items-center"
    >
      <div class="mx:px-0 px-4 md:w-110">
        <slot />
      </div>

      <div
        class="relative lg:absolute lg:top-0 lg:right-0 lg:flex lg:h-screen lg:w-[50vw] lg:items-center"
      >
        <BitsBackgroundsAurora
          :color-stops="['#b3d1f2', '#80afe6', '#00509d']"
          :amplitude="1.0"
          :blend="1.5"
          :speed="1.0"
          :intensity="1"
          class="h-full w-full"
        />
        <NuxtImg
          src="images/login.png"
          class="relative z-10 w-full pl-6 md:w-120 md:min-w-120 lg:size-fit lg:-translate-x-20 lg:rounded-xl lg:p-0"
          width="709"
          height="767"
        />
      </div>
    </div>
  </div>
</template>
