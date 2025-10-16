<template>
  <div class="flex flex-col gap-4">
    <div class="relative">
      <Skeleton height="10rem" />
      <Skeleton
        height="8rem"
        width="8rem"
        shape="circle"
        class="!absolute -bottom-12 left-4"
      />
    </div>
    <Skeleton height="2rem" class="mt-12" />
    <Skeleton height="2rem" />
    <Skeleton height="4rem" />
    <Skeleton height="4rem" />
    <Skeleton height="4rem" />
  </div>
</template>
