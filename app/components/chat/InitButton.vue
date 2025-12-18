<template>
  <Button
    icon="pi pi-comments"
    severity="secondary"
    rounded
    :disabled="isProcessing"
    :loading="isProcessing"
    @click.prevent="startChat"
    v-if="targetUserId !== authData?.user?.id"
    :title="$t('userChatPage.init')"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  targetUserId: string | number;
}>();

const emit = defineEmits<{
  (e: "error", error: unknown): void;
}>();

const isProcessing = ref(false);

const router = useRouter();
const localePath = useLocalePath();
const { data: authData } = useAuth();

async function startChat() {
  const currentUserId = authData.value?.user?.id;
  const targetId = props.targetUserId;

  if (!currentUserId || currentUserId === targetId) {
    return;
  }

  isProcessing.value = true;

  try {
    const response = await $fetch(`/api/chat/conversation/${targetId}`, {
      method: "GET",
    });

    if (!response.conversationId) {
      throw new Error("Conversation not found");
    }

    await router.push(
      localePath({
        name: "user-chat-id",
        params: { id: response.conversationId },
      }),
    );
  } catch (error) {
    console.error(error);
    emit("error", error);
  } finally {
    isProcessing.value = false;
  }
}
</script>
