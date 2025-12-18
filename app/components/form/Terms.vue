<template>
  <div class="flex gap-6">
    <div class="flex flex-row gap-2">
      <Checkbox inputId="terms" name="terms" binary />
      <label for="terms">
        {{ $t("contactForm.terms.prefix") }}
        <NuxtLink
          :to="$localePath('terms')"
          class="underline"
          target="_blank"
          >{{ $t("contactForm.terms.termsLink") }}</NuxtLink
        >
        {{ $t("contactForm.terms.and") }}
        <NuxtLink
          :to="$localePath('privacy')"
          class="underline"
          target="_blank"
        >
          {{ $t("contactForm.terms.privacyLink") }}
        </NuxtLink>
      </label>
    </div>
  </div>
</template>
