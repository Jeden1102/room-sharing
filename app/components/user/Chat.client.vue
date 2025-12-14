<template>
  <div class="flex h-dvh flex-col">
    <div
      class="no-scrollbar flex-grow overflow-y-auto md:max-h-150"
      ref="chatContainer"
      @scroll="handleScroll"
    >
      <div class="sticky top-0 z-10 flex items-center justify-between p-2">
        <NuxtLink
          :to="localePath('user-chat')"
          class="flex items-center rounded-xl bg-white/70 p-3 shadow-md backdrop-blur-sm"
        >
          <Icon name="ic:sharp-arrow-back-ios-new" class="text-xl" />
        </NuxtLink>
        <NuxtLink
          v-if="otherUser"
          :to="
            localePath({
              name: 'users-id',
              params: { id: otherUser.firstName?.toLowerCase() },
              query: { id: otherUser.id },
            })
          "
          class="rounded-xl bg-white/70 px-3 py-2 text-lg font-medium shadow-md backdrop-blur-sm"
        >
          {{ otherUser.firstName }}
        </NuxtLink>
        <div class="w-6"></div>
      </div>

      <div v-if="pending && history.length === 0" class="p-4">
        <Skeleton
          width="12rem"
          height="3rem"
          class="mb-2"
          :class="{ 'ml-auto': i % 2 === 0 }"
          v-for="i in 10"
          :key="i"
        />
      </div>
      <div
        v-else-if="history.length === 0"
        class="py-10 text-center text-gray-500"
      >
        {{ $t("userChatPage.conversation.start") }}
      </div>

      <ChatMessage
        v-for="(entry, index) in history"
        :key="entry.id || index"
        :message="entry"
        :current-user-id="userId"
      />
    </div>

    <div class="relative p-2 pt-5">
      <div
        v-if="isOtherUserTyping"
        class="absolute top-0.5 left-2 animate-pulse text-xs text-gray-400 italic"
      >
        {{ otherUser?.firstName }}
        {{ $t("userChatPage.conversation.typing") }}...
      </div>
      <form @submit.prevent="handleSendMessage" class="flex gap-2">
        <TextArea
          v-model="message"
          :placeholder="$t('userChatPage.conversation.placeholder')"
          class="w-full pr-10"
          @blur="handleBlur"
          @keydown.enter.exact.prevent="handleSendMessage"
        />
        <Button type="submit" :disabled="!message.trim()">
          <Icon name="iconamoon:send-fill" />
        </Button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const localePath = useLocalePath();
const conversationId = route.params.id as string;

const {
  userId,
  history,
  otherUser,
  isOtherUserTyping,
  sendMessage,
  sendTypingStatus,
  loadingMore,
  hasMore,
  cursorId,
} = useChat(conversationId);

const chatContainer = ref<HTMLElement | null>(null);
const message = ref("");
const isTypingLocal = ref(false);
let typingTimeout: NodeJS.Timeout;

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

watch(
  () => history.value.length,
  async (newVal, oldVal) => {
    if (newVal > oldVal && !loadingMore.value) {
      await nextTick();
      scrollToBottom();
    }
  },
);

watch(message, (newVal) => {
  if (newVal.length > 0 && !isTypingLocal.value) {
    isTypingLocal.value = true;
    sendTypingStatus(true);
  }

  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    if (isTypingLocal.value) {
      isTypingLocal.value = false;
      sendTypingStatus(false);
    }
  }, 2500);
});

const handleSendMessage = () => {
  if (!message.value.trim()) return;
  sendMessage(message.value);
  message.value = "";
};

const loadMoreMessages = async () => {
  if (loadingMore.value || !hasMore.value) return;
  loadingMore.value = true;
  const oldScrollHeight = chatContainer.value?.scrollHeight || 0;

  try {
    const url = `/api/chat/conversation/by-id/${conversationId}${cursorId.value ? `?cursor=${cursorId.value}` : ""}`;
    const response = await $fetch<any>(url);
    const newMessages = response?.conversation?.messages;

    if (newMessages?.length > 0) {
      history.value = [...newMessages, ...history.value];
      cursorId.value = newMessages[0].id;
      await nextTick();
      if (chatContainer.value) {
        chatContainer.value.scrollTop =
          chatContainer.value.scrollHeight - oldScrollHeight;
      }
    }
    hasMore.value = response?.hasMore || false;
  } finally {
    loadingMore.value = false;
  }
};

const handleScroll = () => {
  if (chatContainer.value && chatContainer.value.scrollTop < 5) {
    loadMoreMessages();
  }
};

const handleBlur = () => window.scrollTo(0, 0);

const { data: conversationData, pending } = useFetch<any>(
  `/api/chat/conversation/by-id/${conversationId}`,
);

watch(
  conversationData,
  (nv) => {
    if (nv?.conversation) {
      history.value = nv.conversation.messages || [];
      const p = nv.conversation.participants?.find(
        (p: any) => p.userId !== userId,
      );
      if (p?.user) otherUser.value = p.user;
      if (history.value.length > 0) cursorId.value = history.value[0].id;
      hasMore.value = nv.hasMore || false;
      nextTick(scrollToBottom);
    }
  },
  { immediate: true },
);
</script>
