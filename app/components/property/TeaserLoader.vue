<template>
  <div class="card-base flex flex-col rounded-xl p-0 shadow-md">
    <Skeleton height="12rem" />

    <div class="flex flex-1 flex-col space-y-3 p-4">
      <Skeleton height="1.5rem" width="15rem" />
      <Skeleton height="1.5rem" width="5rem" />

      <div class="mt-2 flex gap-2">
        <Skeleton height="1.5rem" />
        <Skeleton height="1.5rem" />
        <Skeleton height="1.5rem" />
      </div>
      <div class="mt-auto flex justify-between">
        <Skeleton height="3rem" width="8rem" />
        <Skeleton height="3rem" width="8rem" />
      </div>
    </div>
  </div>
</template>
