<template>
  <div class="mb-4 flex flex-col gap-2 md:gap-3 md:text-center">
    <BitsAnimatedContent :delay="0.2">
      <p class="text-sm text-gray-600 uppercase md:text-base">{{ subtitle }}</p>
    </BitsAnimatedContent>
    <BitsAnimatedContent :delay="0.4">
      <h2 class="mb-2 text-2xl font-semibold md:text-3xl">{{ title }}</h2>
    </BitsAnimatedContent>
  </div>
</template>

<script setup lang="ts">
type SectionTitleProps = {
  title: string;
  subtitle: string;
};

withDefaults(defineProps<SectionTitleProps>(), {
  title: "",
  subtitle: "",
});
</script>
