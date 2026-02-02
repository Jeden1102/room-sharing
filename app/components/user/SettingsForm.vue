<template>
  <div
    v-if="isLoading || !initialValues"
    class="grid w-full gap-2.5 md:grid-cols-2"
  >
    <Skeleton height="3rem" v-for="n in 6" :key="n" />
    <Skeleton height="13rem" class="col-span-2" />
  </div>

  <Form
    v-else
    v-slot="$form"
    :initialValues="initialValues"
    :resolver="resolver"
    @submit="onFormSubmit"
    class="flex w-full flex-col gap-6"
  >
    <Message
      severity="secondary"
      class="py-2"
      v-show="initialValues.accountType === 'PRIVATE'"
    >
      <div class="flex gap-2">
        <p>{{ $t("userSettingsForm.profileVisibility.label") }}:</p>
        <Badge
          :severity="initialValues.profileVisible ? 'primary' : 'danger'"
          >{{
            initialValues.profileVisible
              ? $t("userSettingsForm.profileVisibility.visible")
              : $t("userSettingsForm.profileVisibility.hidden")
          }}</Badge
        >
      </div>
      <p class="mt-1.5 text-sm font-light">
        {{ $t("userSettingsForm.profileVisibility.hint") }}
      </p>
    </Message>

    <Fieldset :legend="$t('userSettingsForm.accountType.legend')">
      <div class="flex flex-col gap-4">
        <SelectButton
          name="accountType"
          v-model="initialValues.accountType"
          :options="[
            {
              label: $t('userSettingsForm.accountType.private'),
              value: 'PRIVATE',
            },
            {
              label: $t('userSettingsForm.accountType.business'),
              value: 'BUSINESS',
            },
          ]"
          optionLabel="label"
          optionValue="value"
          :allowEmpty="false"
        />
        <p class="text-sm text-gray-500 italic">
          {{
            initialValues.accountType === "BUSINESS"
              ? $t("userSettingsForm.accountType.businessHint")
              : $t("userSettingsForm.accountType.privateHint")
          }}
        </p>
      </div>
    </Fieldset>

    <Fieldset
      v-show="initialValues.accountType === 'BUSINESS'"
      :legend="$t('userSettingsForm.business.legend')"
    >
      <div class="mt-4 flex flex-col gap-6">
        <AtomsInput
          name="companyName"
          :label="$t('userSettingsForm.business.companyName')"
          :form="$form"
        />
        <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <AtomsInput
            name="nip"
            :label="$t('userSettingsForm.business.nip')"
            :form="$form"
          />
          <AtomsInput
            name="website"
            :label="$t('userSettingsForm.business.website')"
            :form="$form"
          />
        </div>
        <AtomsInput
          name="address"
          :label="$t('userSettingsForm.business.address')"
          :form="$form"
        />
      </div>
    </Fieldset>

    <Fieldset :legend="$t('userSettingsForm.general.legend')">
      <div class="flex flex-col gap-6">
        <div
          class="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2"
          v-show="initialValues.accountType === 'PRIVATE'"
        >
          <AtomsInput
            name="firstName"
            :label="$t('userSettingsForm.general.firstName')"
            :form="$form"
          />
          <AtomsInput
            name="lastName"
            :label="$t('userSettingsForm.general.lastName')"
            :form="$form"
          />
        </div>

        <div
          v-show="initialValues.accountType === 'PRIVATE'"
          class="grid w-full grid-cols-1 gap-4 md:grid-cols-2"
        >
          <AtomsNumber
            name="age"
            :label="$t('userSettingsForm.general.age')"
            :form="$form"
          />
          <AtomsDropdown
            name="gender"
            :label="$t('userSettingsForm.general.gender')"
            :options="genderOptions"
            optionLabel="label"
            optionValue="value"
            :form="$form"
          />
        </div>

        <div
          class="grid w-full grid-cols-1 gap-4 md:grid-cols-2"
          v-show="initialValues.accountType === 'PRIVATE'"
        >
          <AtomsMultiselect
            name="interests"
            :label="$t('userSettingsForm.general.interests')"
            :options="taxonomies.interestsOptions"
            optionLabel="label"
            optionValue="value"
            :placeholder="$t('userSettingsForm.general.interestsPlaceholder')"
            :form="$form"
          />

          <AtomsMultiselect
            name="occupations"
            :label="$t('userSettingsForm.general.occupation')"
            :options="taxonomies.occupationsOptions"
            optionLabel="label"
            optionValue="value"
            :placeholder="$t('userSettingsForm.general.occupationPlaceholder')"
            :form="$form"
          />
        </div>

        <div
          v-show="initialValues.accountType === 'PRIVATE'"
          class="flex gap-6"
        >
          <AtomsBaseCheckbox
            name="smoker"
            :label="$t('userSettingsForm.general.smoker')"
            :form="$form"
          />
          <AtomsBaseCheckbox
            name="pets"
            :label="$t('userSettingsForm.general.pets')"
            :form="$form"
          />
        </div>

        <AtomsBaseTextarea
          name="description"
          :label="
            initialValues.accountType === 'BUSINESS'
              ? $t('userSettingsForm.general.businessDescription')
              : $t('userSettingsForm.general.description')
          "
          :rows="4"
          :form="$form"
        />
      </div>
    </Fieldset>

    <Fieldset
      :legend="$t('userSettingsForm.searchLocation.legend')"
      v-show="initialValues.accountType === 'PRIVATE'"
    >
      <div class="mt-2 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <AtomsAutocomplete
          name="city"
          :label="$t('userSettingsForm.searchLocation.city')"
          v-model="initialValues.city"
          :suggestions="filteredCities"
          @complete="searchCity"
          :placeholder="$t('userSettingsForm.searchLocation.cityPlaceholder')"
          :form="$form"
        />
        <div
          v-if="
            availableDistricts &&
            (availableDistricts?.length > 0 ||
              initialValues.districts?.length > 0) &&
            initialValues.city
          "
        >
          <FloatLabel variant="on">
            <AtomsMultiselect
              id="districts"
              name="districts"
              :options="availableDistricts"
              display="chip"
              :placeholder="
                $t('userSettingsForm.searchLocation.districtPlaceholder')
              "
              :label="$t('userSettingsForm.searchLocation.district')"
              :form="$form"
              fluid
            />
          </FloatLabel>
        </div>
      </div>
    </Fieldset>

    <Fieldset
      v-show="initialValues.accountType === 'PRIVATE'"
      :legend="$t('userSettingsForm.searchPreferences.legend')"
    >
      <div class="my-2 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <AtomsMultiselect
          name="searchPreferences"
          :label="$t('userSettingsForm.searchPreferences.preferences')"
          :options="taxonomies.searchPreferencesOptions"
          optionLabel="label"
          optionValue="value"
          :placeholder="
            $t('userSettingsForm.searchPreferences.preferencesPlaceholder')
          "
          :form="$form"
        />

        <AtomsMultiselect
          name="searchPropertyTypes"
          :label="$t('userSettingsForm.searchPreferences.propertyType')"
          :options="taxonomies.searchPropertyTypesOptions"
          optionLabel="label"
          optionValue="value"
          :placeholder="
            $t('userSettingsForm.searchPreferences.propertyTypePlaceholder')
          "
          :form="$form"
        />

        <AtomsNumber
          name="budgetMax"
          :label="$t('userSettingsForm.searchPreferences.budgetMax')"
          :form="$form"
        />
      </div>
    </Fieldset>

    <Fieldset
      v-show="initialValues.accountType === 'PRIVATE'"
      :legend="$t('userSettingsForm.compatibility.legend')"
    >
      <div class="my-2 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <AtomsMultiselect
          name="noiseCompatibility"
          :label="$t('userSettingsForm.compatibility.noise')"
          :options="taxonomies.noiseCompatibilityOptions"
          optionLabel="label"
          optionValue="value"
          :placeholder="$t('userSettingsForm.compatibility.noisePlaceholder')"
          :form="$form"
        />

        <AtomsMultiselect
          name="petsCompatibility"
          :label="$t('userSettingsForm.compatibility.pets')"
          :options="taxonomies.petsCompatibilityOptions"
          optionLabel="label"
          optionValue="value"
          :placeholder="$t('userSettingsForm.compatibility.petsPlaceholder')"
          :form="$form"
        />
      </div>
    </Fieldset>

    <Fieldset :legend="$t('userSettingsForm.media.legend')">
      <FormFileUploader
        id="moodboardImages"
        name="moodboardImages"
        :label="
          initialValues.accountType === 'BUSINESS'
            ? $t('userSettingsForm.media.businessImages')
            : $t('userSettingsForm.media.moodboardImages')
        "
        :canSetPrimary="false"
        v-model="initialValues.moodboardImages"
        @filesSelected="(newFiles) => (files = newFiles)"
        @delete="deleteImage"
        :maxFiles="5 - initialValues.moodboardImages.length"
        :form="$form"
        :maxFileSize="5500000"
      />
    </Fieldset>

    <Fieldset :legend="$t('userSettingsForm.contact.legend')">
      <div class="my-2 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <AtomsInput
          name="phone"
          :label="$t('userSettingsForm.contact.phone')"
          :form="$form"
        />

        <AtomsInput
          name="contactEmail"
          :label="$t('userSettingsForm.contact.email')"
          :form="$form"
        />
      </div>
    </Fieldset>

    <div
      class="sticky bottom-17 left-0 z-10 flex flex-col gap-2 bg-white py-2 lg:bottom-0"
    >
      <Button
        type="submit"
        :label="$t('userSettingsForm.submit')"
        :loading="formStatus.isLoading"
        class="mt-4 w-fit"
      />
      <Message
        class="w-full"
        :severity="formStatus.success ? 'info' : 'error'"
        v-if="formStatus.message"
      >
        {{ formStatus.message }}
      </Message>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { userProfileSchema } from "~/schemas/userProfileSchema";

const formStatus = ref({ success: false, message: "", isLoading: false });
const initialValues = ref<any>(null);
const files = ref<File[]>([]);
const filteredCities = ref<string[]>([]);
const availableDistricts = ref<string[]>();

const taxonomies = useTaxonomies();
const { genderOptions } = taxonomies;

const {
  status: userStatus,
  data: userData,
  refresh,
} = await useFetch("/api/user/me", {
  lazy: true,
  cache: "no-cache",
});

const isLoading = computed(() => userStatus.value === "pending");

const initializeForm = () => {
  if (userData.value?.user) {
    const u = userData.value.user;

    initialValues.value = { ...u };
  }
};

watch(
  userStatus,
  (status) => {
    if (status === "success") {
      initializeForm();
    }
  },
  { immediate: true },
);

const searchCity = async (event: { query: string }) => {
  const query = event.query?.trim();
  if (!query) return (filteredCities.value = []);

  try {
    const res = await $fetch(
      `/api/geo/autocomplete?q=${encodeURIComponent(query)}`,
    );
    filteredCities.value =
      res?.predictions?.map((p: any) => p.description.split(",")[0]) || [];
  } catch (err) {
    console.error("Error loading cities:", err);
  }
};

const fetchDistricts = async (city: string) => {
  if (!city) return;
  try {
    availableDistricts.value = [];
    const districtRes = await $fetch(
      `/api/geo/districts?city=${encodeURIComponent(city)}`,
    );
    availableDistricts.value = districtRes.districts;
  } catch (err) {
    console.error("Error loading location data:", err);
  }
};

watch(
  () => initialValues.value?.city,
  async (newCity, oldCity) => {
    if (!newCity) return;

    if (oldCity === undefined) {
      await fetchDistricts(newCity);
      return;
    }

    initialValues.value.districts = [];
    await fetchDistricts(newCity);
  },
  { immediate: true },
);

const resolver = ref(zodResolver(userProfileSchema));
const { t } = useI18n();

const onFormSubmit = async (event: any) => {
  const { valid, values } = event;

  if (!valid || !values) return;

  formStatus.value.isLoading = true;

  try {
    if (files.value && files.value.length) {
      const formDataObj = new FormData();
      for (const file of files.value) {
        formDataObj.append("moodboardImages", file);
      }
      const response = await $fetch("/api/files", {
        method: "POST",
        body: formDataObj,
      });
      values.moodboardImages = [
        ...response,
        ...(initialValues.value.moodboardImages || []),
      ];
    }

    if (availableDistricts.value?.length === 0) {
      values.districts = [];
    }

    const isBusiness = values.accountType === "BUSINESS";

    const obligatoryFields = isBusiness
      ? []
      : ["firstName", "lastName", "age", "gender", "city"];

    values.profileVisible = obligatoryFields.every((field) => values[field]);

    const { data, error } = await useFetch("/api/user/update", {
      method: "POST",
      body: values,
    });

    if (error.value) throw new Error(error.value.message);

    formStatus.value.success = true;
    formStatus.value.message = t("userSettingsForm.success");
    await refresh();
  } catch (e: any) {
    formStatus.value.success = false;
    formStatus.value.message = e.message || t("userSettingsForm.error");
  } finally {
    formStatus.value.isLoading = false;
  }
};

const deleteImage = async (img: string) => {
  const newImages = initialValues.value.moodboardImages.filter(
    (i: string) => i !== img,
  );
  try {
    await $fetch("/api/files/delete", {
      method: "POST",
      body: {
        uri: img,
        entity: "user",
        field: "moodboardImages",
        images: newImages,
      },
    });
    initialValues.value.moodboardImages = newImages;
  } catch (e) {
    console.error(e);
  }
};
</script>
