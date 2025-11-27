<template>
  <div v-if="isLoading" class="grid w-full gap-2.5 md:grid-cols-2">
    <Skeleton height="3rem" />
    <Skeleton height="3rem" />
    <Skeleton height="3rem" />
    <Skeleton height="3rem" />
    <Skeleton height="3rem" />
    <Skeleton height="3rem" />
    <Skeleton height="13rem" class="col-span-2" />
  </div>
  <Form
    v-else-if="initialValues"
    v-slot="$form"
    :initialValues="initialValues"
    :resolver="resolver"
    @submit="onFormSubmit"
    class="flex w-full flex-col gap-6"
  >
    <Message severity="secondary" class="py-2">
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
    <Fieldset :legend="$t('userSettingsForm.general.legend')">
      <div class="flex flex-col gap-6">
        <div class="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
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

        <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <AtomsNumber
            name="age"
            :label="$t('userSettingsForm.general.age')"
            :form="$form"
          />
          <AtomsDropdown
            name="gender"
            :label="$t('userSettingsForm.general.gender')"
            :options="genderOptions"
            optionLabel="name"
            optionValue="id"
            :form="$form"
          />
        </div>

        <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <AtomsMultiselect
            name="interests"
            :label="$t('userSettingsForm.general.interests')"
            :options="taxonomies.interestsOptions"
            optionLabel="name"
            optionValue="id"
            :placeholder="$t('userSettingsForm.general.interestsPlaceholder')"
            :form="$form"
          />

          <AtomsMultiselect
            name="occupations"
            :label="$t('userSettingsForm.general.occupation')"
            :options="taxonomies.occupationsOptions"
            optionLabel="name"
            optionValue="id"
            :placeholder="$t('userSettingsForm.general.occupationPlaceholder')"
            :form="$form"
          />
        </div>

        <div class="flex gap-6">
          <AtomsCheckbox
            name="smoker"
            :label="$t('userSettingsForm.general.smoker')"
            :form="$form"
          />
          <AtomsCheckbox
            name="pets"
            :label="$t('userSettingsForm.general.pets')"
            :form="$form"
          />
        </div>

        <AtomsBaseTextarea
          name="description"
          :label="$t('userSettingsForm.general.description')"
          :rows="4"
          :form="$form"
        />
      </div>
    </Fieldset>

    <Fieldset :legend="$t('userSettingsForm.searchLocation.legend')">
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
              initialValues.districts.length > 0) &&
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

    <Fieldset :legend="$t('userSettingsForm.searchPreferences.legend')">
      <div class="my-2 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <AtomsMultiselect
          name="searchPreferences"
          :label="$t('userSettingsForm.searchPreferences.preferences')"
          :options="taxonomies.searchPreferencesOptions"
          optionLabel="name"
          optionValue="id"
          :placeholder="
            $t('userSettingsForm.searchPreferences.preferencesPlaceholder')
          "
          :form="$form"
        />

        <AtomsMultiselect
          name="searchPropertyTypes"
          :label="$t('userSettingsForm.searchPreferences.propertyType')"
          :options="taxonomies.searchPropertyTypesOptions"
          optionLabel="name"
          optionValue="id"
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

    <Fieldset :legend="$t('userSettingsForm.compatibility.legend')">
      <div class="my-2 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <AtomsMultiselect
          name="noiseCompatibility"
          :label="$t('userSettingsForm.compatibility.noise')"
          :options="taxonomies.noiseCompatibilityOptions"
          optionLabel="name"
          optionValue="id"
          :placeholder="$t('userSettingsForm.compatibility.noisePlaceholder')"
          :form="$form"
        />

        <AtomsMultiselect
          name="petsCompatibility"
          :label="$t('userSettingsForm.compatibility.pets')"
          :options="taxonomies.petsCompatibilityOptions"
          optionLabel="name"
          optionValue="id"
          :placeholder="$t('userSettingsForm.compatibility.petsPlaceholder')"
          :form="$form"
        />
      </div>
    </Fieldset>

    <Fieldset :legend="$t('userSettingsForm.media.legend')">
      <FormFileUploader
        id="moodboardImages"
        name="moodboardImages"
        :label="$t('userSettingsForm.media.moodboardImages')"
        :canSetPrimary="false"
        v-model="initialValues.moodboardImages"
        @filesSelected="(newFiles) => (files = newFiles)"
        @delete="deleteImage"
        :maxFiles="5 - initialValues.moodboardImages.length"
        :form="$form"
      />
    </Fieldset>

    <Fieldset :legend="$t('userSettingsForm.contact.legend')">
      <div class="my-2 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <AtomsInput
          name="phone"
          :label="$t('userSettingsForm.contact.phone')"
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
const filteredCities = ref<any[]>([]);
const availableDistricts = ref<any[]>();

const taxonomies = useTaxonomies();
const { genderOptions } = taxonomies;

const { status: userStatus, data: userData } = await useFetch("/api/user/me", {
  lazy: true,
  cache: "no-cache",
});

const isLoading = computed(() => userStatus.value === "pending");

const initializeForm = () => {
  if (userData.value?.user) {
    const u = userData.value.user;

    initialValues.value = u;
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

const searchCity = async (event: any) => {
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

const onFormSubmit = async ({ valid, values }: any) => {
  if (!valid) return;
  formStatus.value.isLoading = true;

  if (files.value && files.value.length) {
    const formDataObj = new FormData();
    files.value.forEach((file) => {
      formDataObj.append("moodboardImages", file);
    });

    const response = await $fetch("/api/files", {
      method: "POST",
      body: formDataObj,
    });

    values.moodboardImages = [
      ...response,
      ...initialValues.value.moodboardImages,
    ];
  }

  if (availableDistricts.value?.length === 0) {
    values.districts = [];
  }

  const obligatoryFields = ["firstName", "lastName", "age", "gender", "city"];

  values.profileVisible = obligatoryFields.every((field) => values[field]);

  try {
    const { data, error } = await useFetch("/api/user/update", {
      method: "POST",
      body: values,
    });

    if (error.value) throw new Error(error.value.message);

    formStatus.value.success = true;
    formStatus.value.message = "Profile updated successfully!";
  } catch (e: any) {
    formStatus.value.success = false;
    formStatus.value.message = e.message || "Update failed.";
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
