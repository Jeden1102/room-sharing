<template>
  <div class="flex gap-6">
    <div class="flex flex-row gap-2">
      <Checkbox id="terms" name="terms" binary />
      <label for="terms">
        {{ $t("contactForm.terms.prefix") }}
        <NuxtLink :to="$localePath('terms')" class="underline">{{
          $t("contactForm.terms.termsLink")
        }}</NuxtLink>
        {{ $t("contactForm.terms.and") }}
        <NuxtLink :to="$localePath('privacy-policy')" class="underline">
          {{ $t("contactForm.terms.privacyLink") }}
        </NuxtLink>
      </label>
    </div>
  </div>
</template>
