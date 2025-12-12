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

        <span
          v-if="otherUser"
          class="rounded-xl bg-white/70 px-3 py-2 text-lg font-medium shadow-md backdrop-blur-sm"
        >
          {{ otherUser.firstName }}
        </span>

        <div class="w-6"></div>
      </div>
      <div v-if="pending">
        <Skeleton
          width="12rem"
          height="3rem"
          class="mb-2"
          :class="{ 'ml-auto': i % 2 === 0 }"
          v-for="i in 10"
        ></Skeleton>
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
    <div class="py-4">
      <form @submit.prevent="sendData" class="flex gap-2">
        <TextArea
          v-model="message"
          :placeholder="$t('userChatPage.conversation.placeholder')"
          class="w-full pr-10"
        />
        <Button type="submit" :disabled="!message.trim()">
          <Icon name="iconamoon:send-fill" />
        </Button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
interface User {
  id: string;
  firstName: string;
  profileImage: string;
}

const route = useRoute();
const conversationId = route.params.id;
const { data: userData } = useAuth();
const localePath = useLocalePath();

const userId = userData.value?.user?.id;

const chatContainer = ref<HTMLElement | null>(null);
const loadingMore = ref(false);
const hasMore = ref(true);
const cursorId = ref<string | null>(null);
const otherUser = ref<User | null>(null);

const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
const wsHost = window.location.host;

const wsUrl = `${wsProtocol}//${wsHost}/api/ws/chat?conversationId=${conversationId}&userId=${userId}`;

const { status, data, send, open, close } = useWebSocket(wsUrl);
const history = ref<any[]>([]);

watch(data, (newValue) => {
  const newMessage = JSON.parse(newValue);
  history.value.push(newMessage);
  nextTick(scrollToBottom);
});

const message = ref("");
function sendData() {
  if (!message.value.trim() || !send) return;

  history.value.push({
    senderId: userId,
    content: message.value,
    createdAt: new Date().toISOString(),
  });

  send(message.value);
  message.value = "";
  nextTick(scrollToBottom);
}

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

const loadMoreMessages = async () => {
  if (loadingMore.value || !hasMore.value) return;

  loadingMore.value = true;

  const oldScrollHeight = chatContainer.value?.scrollHeight || 0;

  try {
    const url = `/api/chat/conversation/by-id/${conversationId}${cursorId.value ? `?cursor=${cursorId.value}` : ""}`;

    const response = await $fetch<{
      success: boolean;
      conversation: {
        messages: any[];
        participants: { userId: string; user: User }[];
      };
      hasMore: boolean;
    }>(url);

    const newMessages = response?.conversation?.messages;

    if (newMessages && newMessages.length > 0) {
      history.value = [...newMessages, ...history.value];
      cursorId.value = newMessages[0].id;

      await nextTick();
      const newScrollHeight = chatContainer.value?.scrollHeight || 0;
      const scrollDifference = newScrollHeight - oldScrollHeight;

      if (chatContainer.value) {
        chatContainer.value.scrollTop = scrollDifference;
      }
    }

    hasMore.value = response?.hasMore || false;
  } catch (e) {
    console.error("Błąd ładowania starszych wiadomości:", e);
  } finally {
    loadingMore.value = false;
  }
};

const handleScroll = () => {
  if (chatContainer.value && hasMore.value && !loadingMore.value) {
    if (chatContainer.value.scrollTop < 5) {
      loadMoreMessages();
    }
  }
};

const { data: conversationData, pending } = useFetch(
  `/api/chat/conversation/by-id/${conversationId}`,
  {
    method: "GET",
  },
);

watch(
  conversationData,
  (newValue) => {
    if (newValue?.conversation?.messages) {
      history.value = newValue.conversation.messages;

      const participants = newValue.conversation.participants;
      if (participants) {
        const otherParticipantData = participants.find(
          (p) => p.userId !== userId,
        );
        if (otherParticipantData?.user) {
          otherUser.value = otherParticipantData.user as User;
        }
      }

      if (history.value.length > 0) {
        cursorId.value = history.value[history.value.length - 1].id;
      }

      hasMore.value = newValue.hasMore || false;

      nextTick(() => {
        scrollToBottom();
      });
    }
  },
  { immediate: true },
);

onMounted(() => {
  chatContainer.value?.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  chatContainer.value?.removeEventListener("scroll", handleScroll);
});
</script>
