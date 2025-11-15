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
        <p>Profile visibility:</p>
        <Badge
          :severity="initialValues.profileVisible ? 'primary' : 'danger'"
          >{{ initialValues.profileVisible ? "Visible" : "Hidden" }}</Badge
        >
      </div>
      <p class="mt-1.5 text-sm font-light">
        Your profile is visible on users list page only if fields: First Name,
        Last Name, Age, Gender and City are filled.
      </p>
    </Message>
    <Fieldset legend="General">
      <div class="flex flex-col gap-6">
        <div class="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <AtomsInput name="firstName" label="First Name" :form="$form" />
          <AtomsInput name="lastName" label="Last Name" :form="$form" />
        </div>

        <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <AtomsNumber name="age" label="Age" :form="$form" />
          <AtomsDropdown
            name="gender"
            label="Gender"
            :options="genderOptions"
            optionLabel="name"
            optionValue="id"
            :form="$form"
          />
        </div>

        <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <AtomsMultiselect
            name="interests"
            label="Interests"
            :options="interestOptions"
            optionLabel="name"
            optionValue="id"
            placeholder="Select interests"
            :form="$form"
          />

          <AtomsMultiselect
            name="occupation"
            label="Occupation"
            :options="occupationOptions"
            optionLabel="name"
            optionValue="id"
            placeholder="Select occupation options"
            :form="$form"
          />
        </div>

        <div class="flex gap-6">
          <AtomsCheckbox name="smoker" label="Smoker" :form="$form" />
          <AtomsCheckbox name="pets" label="Has pets" :form="$form" />
        </div>

        <AtomsBaseTextarea
          name="description"
          label="Description"
          :rows="4"
          :form="$form"
        />
      </div>
    </Fieldset>

    <Fieldset legend="Search location">
      <div class="mt-2 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <AtomsAutocomplete
          name="city"
          label="City"
          v-model="initialValues.city"
          :suggestions="filteredCities"
          @complete="searchCity"
          placeholder="Wpisz miasto"
          :form="$form"
        />
        <div
          v-if="
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
              placeholder="Wybierz dzielnicę"
              label="Dzielnica"
              :form="$form"
              fluid
            />
          </FloatLabel>
        </div>
      </div>
    </Fieldset>

    <Fieldset legend="Search preferences">
      <div class="my-2 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <AtomsMultiselect
          name="searchPreferences"
          label="Search preferences"
          :options="searchPreferencesOptions"
          optionLabel="name"
          optionValue="id"
          placeholder="Select search preferences"
          :form="$form"
        />

        <AtomsMultiselect
          name="searchPropertyType"
          label="Search property type"
          :options="searchPropertyTypeOptions"
          optionLabel="name"
          optionValue="id"
          placeholder="Select property type"
          :form="$form"
        />

        <AtomsNumber name="budgetMax" label="Max Budget" :form="$form" />
      </div>
    </Fieldset>

    <Fieldset legend="Compatibility">
      <div class="my-2 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <AtomsMultiselect
          name="noiseCompatibility"
          label="Noise compatibility"
          :options="noiseCompatibilityOptions"
          optionLabel="name"
          optionValue="id"
          placeholder="Select noise compatibility"
          :form="$form"
        />

        <AtomsMultiselect
          name="petsCompatibility"
          label="Pets compatibility"
          :options="petsCompatibilityOptions"
          optionLabel="name"
          optionValue="id"
          placeholder="Select pets compatibility"
          :form="$form"
        />
      </div>
    </Fieldset>

    <Fieldset legend="Media">
      <FormFileUploader
        id="moodboardImages"
        name="moodboardImages"
        label="Moodboard Images"
        :canSetPrimary="false"
        v-model="initialValues.moodboardImages"
        @filesSelected="(newFiles) => (files = newFiles)"
        @delete="deleteImage"
        :maxFiles="5 - initialValues.moodboardImages.length"
        :form="$form"
      />
    </Fieldset>

    <Fieldset legend="Contact">
      <div class="my-2 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <AtomsInput name="phone" label="Phone Number" :form="$form" />
      </div>
    </Fieldset>

    <div
      class="sticky bottom-17 left-0 z-10 flex flex-col gap-2 bg-white py-2 lg:bottom-0"
    >
      <Button
        type="submit"
        label="Save Changes"
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

const genderOptions = [
  { name: "Male", id: "male" },
  { name: "Female", id: "female" },
];

const interestOptions = ref<any[]>([]);
const occupationOptions = ref<any[]>([]);
const searchPreferencesOptions = ref<any[]>([]);
const searchPropertyTypeOptions = ref<any[]>([]);
const noiseCompatibilityOptions = ref<any[]>([]);
const petsCompatibilityOptions = ref<any[]>([]);

const { status: taxonomyStatus, data: taxonomies } = await useFetch(
  "/api/user/taxonomies",
  { lazy: true },
);

const { status: userStatus, data: userData } = await useFetch("/api/user/me", {
  lazy: true,
  cache: "no-cache",
});

const isLoading = computed(
  () => taxonomyStatus.value === "pending" || userStatus.value === "pending",
);

const initializeForm = () => {
  if (taxonomies.value) {
    interestOptions.value = taxonomies.value.interests || [];
    occupationOptions.value = taxonomies.value.occupations || [];
    searchPreferencesOptions.value = taxonomies.value.searchPreferences || [];
    searchPropertyTypeOptions.value = taxonomies.value.propertyTypes || [];
    noiseCompatibilityOptions.value = taxonomies.value.noiseCompatibility || [];
    petsCompatibilityOptions.value = taxonomies.value.petsCompatibility || [];
  }

  if (userData.value?.user) {
    const u = userData.value.user;
    u.interests = u.interests.map((i: any) => i.id || i);
    u.occupation = u.occupation.map((i: any) => i.id || i);
    u.searchPreferences = u.searchPreferences.map((i: any) => i.id || i);
    u.searchPropertyType = u.searchPropertyType.map((i: any) => i.id || i);
    u.noiseCompatibility = u.noiseCompatibility.map((i: any) => i.id || i);
    u.petsCompatibility = u.petsCompatibility.map((i: any) => i.id || i);
    initialValues.value = u;
  }
};

watch(
  [taxonomyStatus, userStatus],
  ([taxStatus, userStat]) => {
    if (taxStatus === "success" && userStat === "success") {
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
