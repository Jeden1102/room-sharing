<template>
  <div>
    <div>
      <p v-for="entry in history">{{ entry.senderId }} - {{ entry.content }}</p>
    </div>
    <form @submit.prevent="sendData">
      <input v-model="message" />
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const conversationId = route.params.id;
const { data: userData } = useAuth();

const userId = userData.value?.user?.id;

const { status, data, send, open, close } = useWebSocket(
  `wss://${location.host}/api/ws/chat?conversationId=${conversationId}&userId=${userId}`,
);

const history = ref<any[]>([]);
watch(data, (newValue) => {
  history.value.push(JSON.parse(newValue));
});

const message = ref("");
function sendData() {
  history.value.push({
    senderId: userId,
    content: message.value,
    createdAt: new Date().toISOString(),
  });
  send(message.value);
  message.value = "";
}

const {
  data: conversationData,
  pending,
  error,
} = useFetch(`/api/chat/conversation/by-id/${conversationId}`, {
  method: "GET",
});

watch(
  conversationData,
  (newValue) => {
    history.value = newValue?.conversation?.messages;
  },
  { immediate: true },
);
</script>
