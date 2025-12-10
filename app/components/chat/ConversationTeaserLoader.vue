<template>
  <div
    class="flex items-center border-b border-gray-200 px-3 py-4 transition duration-150 hover:bg-gray-200"
  >
    <Skeleton shape="circle" size="3rem" class="mr-2"></Skeleton>
    <div class="min-w-0 flex-1">
      <Skeleton width="10rem" class="mb-2"></Skeleton>
      <Skeleton width="20rem" class="mb-2"></Skeleton>
    </div>
    <div class="ml-4 flex flex-col items-end">
      <Skeleton width="2rem" class="mb-2"></Skeleton>
    </div>
  </div>
</template>
