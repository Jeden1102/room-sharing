<template>
  <div v-if="variant === 'popover'">
    <Button
      type="button"
      icon="pi pi-share-alt"
      @click="handleShareClick"
      rounded
      severity="secondary"
    />

    <Popover ref="op">
      <div class="flex flex-col gap-4">
        <div>
          <span class="mb-2 block text-sm font-medium text-gray-600">
            {{ $t("propertyFull.saveLink") }}
          </span>
          <InputGroup>
            <InputText :value="currentUrl" readonly class="text-sm" />
            <InputGroupAddon
              @click="copyLink"
              class="cursor-pointer transition-colors hover:bg-gray-100"
            >
              <i
                :class="['pi', copied ? 'pi-check text-blue-500' : 'pi-copy']"
              ></i>
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div>
          <span class="mb-2 block text-sm font-medium text-gray-600">
            {{ $t("propertyFull.shareOnSocials") }}
          </span>
          <div class="grid grid-cols-2 gap-2">
            <Button
              v-for="network in ['facebook', 'twitter', 'whatsapp', 'telegram']"
              class="capitalize"
            >
              <SocialShare :key="network" :network="network">
                <template #label>{{ network }}</template>
              </SocialShare>
            </Button>
          </div>
        </div>
      </div>
    </Popover>
  </div>

  <div v-else-if="variant === 'full'" class="card-base bg-gray-100">
    <h3 class="mb-6 text-xl font-bold">{{ title }}</h3>
    <div class="grid grid-cols-2 gap-2">
      <Button
        v-for="network in ['facebook', 'twitter', 'whatsapp', 'telegram']"
        class="capitalize"
      >
        <SocialShare :key="network" :network="network">
          <template #label>{{ network }}</template>
        </SocialShare>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  variant: "popover" | "full";
}>();

const op = ref();
const copied = ref(false);
const currentUrl = ref("");
const isMobileShareSupported = ref(false);

onMounted(() => {
  currentUrl.value = window.location.href;

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  isMobileShareSupported.value = !!navigator.share && isMobile;
});

const nativeShare = async () => {
  try {
    await navigator.share({
      url: currentUrl.value,
    });
  } catch (err) {
    if ((err as Error).name !== "AbortError") {
      console.error("Error sharing:", err);
    }
  }
};

const handleShareClick = (event: Event) => {
  if (isMobileShareSupported.value) {
    nativeShare();
  } else {
    op.value.toggle(event);
  }
};

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(currentUrl.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  } catch (err) {
    console.error("Failed to copy link", err);
  }
};
</script>
