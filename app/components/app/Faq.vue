<template>
  <section :class="containered && 'container-spacing container max-w-5xl'">
    <div class="mb-8 flex flex-col items-center" v-if="title && subtitle">
      <AppSectionTitle :title="title" :subtitle="subtitle" />
    </div>

    <div class="text-left">
      <Accordion>
        <AccordionPanel
          v-for="(item, index) in questions"
          :key="index"
          :value="index"
        >
          <AccordionHeader>{{ item.question }}</AccordionHeader>
          <AccordionContent>
            <p class="m-0">
              {{ item.answer }}
            </p>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  </section>
</template>

<script setup lang="ts">
type Question = {
  question: string;
  answer: string;
};

defineProps<{
  title?: string;
  subtitle?: string;
  image?: string;
  questions: Question[];
  containered?: boolean;
}>();
</script>
