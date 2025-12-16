<template>
  <div
    class="mb-3 flex"
    :class="{ 'justify-end': isSender, 'justify-start': !isSender }"
  >
    <div
      class="max-w-xs rounded-xl px-4 py-2 shadow-sm lg:max-w-md"
      :class="{
        'bg-primary-400 rounded-br-none text-white': isSender,
        'bg-primary-50 text-primary-400 rounded-tl-none': !isSender,
      }"
    >
      <div class="text-sm break-words whitespace-pre-wrap">
        {{ message.content }}
      </div>

      <div class="mt-1 text-right text-xs opacity-75">
        {{ formatTime(message.createdAt) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Message {
  id?: string;
  senderId?: string;
  content: string;
  createdAt: string;
}

const props = defineProps<{
  message: Message;
  currentUserId: string | undefined;
}>();

const isSender = computed(() => props.message.senderId === props.currentUserId);
</script>
