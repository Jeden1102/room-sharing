<template>
  <NuxtLink
    :key="conversation.conversationId"
    :to="
      localePath({
        name: 'user-chat-id',
        params: { id: conversation.conversationId },
      })
    "
    class="flex items-center border-b border-gray-200 px-3 py-4 transition duration-150 hover:bg-gray-200"
  >
    <Avatar
      :image="
        conversation.otherUser?.profileImage ||
        '/images/user/avatar-placeholder.webp'
      "
      shape="circle"
      class="mr-4"
      size="large"
      :ariaLabel="conversation.otherUser?.firstName"
    />
    <div class="min-w-0 flex-1">
      <p class="truncate text-base font-semibold">
        {{ conversation.otherUser?.firstName }}
      </p>
      <p class="mt-1 max-w-100 truncate text-sm text-gray-500">
        {{ conversation.lastMessage?.content }}
      </p>
    </div>
    <div class="ml-4 flex flex-col items-end">
      <span
        v-if="conversation.unreadCount > 0"
        class="bg-primary-500 mb-2 grid size-5 place-items-center rounded-full text-xs text-white"
      >
        {{ conversation.unreadCount }}</span
      >
      <span class="text-xs text-gray-400">
        {{ formatTime(props.conversation.updatedAt) }}
      </span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const localePath = useLocalePath();

type Conversation = {
  conversationId: string;
  unreadCount: number;
  updatedAt: string;
  otherUser: {
    id: string;
    firstName: string;
    profileImage: string;
  };
  lastMessage: {
    content: string;
    createdAt: string;
  };
};

const props = defineProps<{
  conversation: Conversation;
}>();
</script>
