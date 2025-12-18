<template>
  <div>
    <div
      class="relative mb-4 w-full"
      v-if="conversationData && conversationData.conversations.length"
    >
      <IconField iconPosition="left" class="w-full">
        <InputIcon class="pi pi-search" />
        <InputText
          v-model="searchTerm"
          :placeholder="$t('userChatPage.search.placeholder')"
          class="w-full pr-10"
          aria-label="Wyszukaj konwersację"
        />
      </IconField>

      <i
        v-if="searchTerm"
        class="pi pi-times absolute top-1/2 right-3 z-10 -translate-y-1/2 cursor-pointer"
        @click="clearSearch"
      ></i>
    </div>

    <div v-if="pending" class="flex flex-col gap-4">
      <ChatConversationTeaserLoader v-for="i in 6" :key="i" />
    </div>

    <AppCta
      v-else-if="conversationData.conversations.length === 0"
      :title="$t('userChatPage.empty.title')"
      :subtitle="$t('userChatPage.empty.subtitle')"
      :showLogo="true"
      variant="primary"
    >
      <Button asChild v-slot="slotProps" severity="secondary">
        <RouterLink :to="$localePath('users')" :class="slotProps.class">
          {{ $t("userChatPage.empty.button") }}
        </RouterLink>
      </Button>
    </AppCta>

    <p
      v-else-if="filteredConversations.length === 0"
      class="text-center text-gray-500"
    >
      {{ $t("userChatPage.search.noResults") }}
    </p>

    <div v-else>
      <ChatConversationTeaser
        v-for="conv in filteredConversations"
        :key="conv.conversationId"
        :conversation="conv"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
usePageSeo({ title: "seo.chat.title", description: "seo.chat.description" });

const { data: conversationData, pending } = useFetch(
  `/api/chat/conversations`,
  {
    method: "GET",
  },
);

const searchTerm = ref("");

const clearSearch = () => {
  searchTerm.value = "";
};

const filteredConversations = computed(() => {
  if (pending.value || !conversationData.value?.conversations) {
    return [];
  }

  const conversations = conversationData.value.conversations;
  const term = searchTerm.value.toLowerCase().trim();

  if (!term) {
    return conversations;
  }

  return conversations.filter((conv: { otherUser: { firstName: string } }) => {
    const otherUser = conv.otherUser;

    if (!otherUser || !otherUser.firstName) {
      return false;
    }

    const firstName = otherUser.firstName.toLowerCase();

    return firstName.includes(term);
  });
});
</script>
