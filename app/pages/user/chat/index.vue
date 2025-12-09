<template>
  <div class="p-6">
    <h1 class="mb-6 text-2xl font-bold">Chats</h1>

    <div v-if="pending" class="p-8 text-center">
      <i class="pi pi-spin pi-spinner text-primary-500 text-4xl"></i>
    </div>

    <div v-else-if="error" class="p-8 text-center text-red-500">
      Błąd ładowania konwersacji: {{ error.message }}
    </div>

    <div
      v-else-if="conversationData.length === 0"
      class="p-8 text-center text-gray-500"
    >
      Nie masz jeszcze żadnych aktywnych konwersacji.
    </div>

    <div v-else class="space-y-4">
      <NuxtLink
        v-for="conv in conversationData.conversations"
        :key="conv.conversationId"
        :to="
          localePath({
            name: 'user-chat-id',
            params: { id: conv.conversationId },
          })
        "
        class="hover:bg-surface-50 border-surface-200 flex items-center rounded-lg border-b p-3 transition duration-150"
      >
        <Avatar
          :image="
            conv.otherUser?.profileImage ||
            '/images/user/avatar-placeholder.webp'
          "
          :label="conv.otherUser?.firstName?.charAt(0)"
          shape="circle"
          class="mr-4"
        />
        <div class="min-w-0 flex-1">
          <p class="truncate text-base font-semibold text-gray-900">
            {{ conv.otherUser?.firstName }}
          </p>
          <p class="truncate text-sm text-gray-500">
            {{ getLastMessage(conv) }}
          </p>
        </div>
        <div class="ml-4 flex flex-col items-end">
          <Tag
            v-if="conv.unreadCount > 0"
            :value="conv.unreadCount"
            severity="danger"
            class="mb-1"
          />
          <span class="text-xs text-gray-400">
            {{ formatTime(conv.updatedAt) }}
          </span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "#imports";
import { useLocalePath } from "#i18n";

usePageSeo({ title: "seo.chat.title", description: "seo.chat.description" });

const localePath = useLocalePath();

const {
  data: conversationData,
  pending,
  error,
} = useFetch(`/api/chat/conversations`, {
  method: "GET",
});

function getLastMessage(conv: any): string {
  return conv.lastMessage
    ? conv.lastMessage.content.substring(0, 40) + "..."
    : "Rozpocznij konwersację.";
}

function formatTime(date: string) {
  if (!date) return "";
  return new Date(date).toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
</script>
