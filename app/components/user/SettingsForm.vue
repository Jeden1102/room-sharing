<template>
  <Form
    v-slot="$form"
    :initialValues="initialValues"
    :resolver="resolver"
    @submit="onFormSubmit"
    v-if="initialValues"
    class="flex w-full flex-col gap-6"
  >
    <Fieldset legend="General">
      <div class="flex flex-col gap-6">
        <div class="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <AtomsInput name="firstName" label="First Name" />
          <AtomsInput name="lastName" label="Last Name" />
        </div>

        <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <AtomsNumber name="age" label="Age" />
          <AtomsDropdown
            name="gender"
            label="Gender"
            :options="genderOptions"
            optionLabel="name"
            optionValue="id"
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
          />

          <AtomsMultiselect
            name="occupation"
            label="Occupation"
            :options="occupationOptions"
            optionLabel="name"
            optionValue="id"
            placeholder="Select occupation options"
          />
        </div>

        <div class="flex gap-6">
          <AtomsCheckbox name="smoker" label="Smoker" />
          <AtomsCheckbox name="pets" label="Has pets" />
        </div>

        <AtomsTextarea name="description" label="Description" :rows="4" />
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
        />

        <div
          v-if="
            (availableDistricts?.length > 0 || initialValues.districts) &&
            initialValues.city
          "
        >
          <FloatLabel variant="on">
            <AtomsMultiselect
              id="districts"
              name="districts"
              v-model="initialValues.districts"
              :options="availableDistricts"
              display="chip"
              placeholder="Wybierz dzielnicę"
              label="Dzielnica"
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
        />

        <AtomsMultiselect
          name="searchPropertyType"
          label="Search property type"
          :options="searchPropertyTypeOptions"
          optionLabel="name"
          optionValue="id"
          placeholder="Select property type"
        />

        <AtomsNumber name="budgetMax" label="Max Budget" />
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
        />

        <AtomsMultiselect
          name="petsCompatibility"
          label="Pets compatibility"
          :options="petsCompatibilityOptions"
          optionLabel="name"
          optionValue="id"
          placeholder="Select pets compatibility"
        />
      </div>
    </Fieldset>

    <Fieldset legend="Media">
      <FormFileUploader
        id="moodboardImages"
        name="moodboardImages"
        label="Moodboard Images"
        v-model="initialValues.moodboardImages"
        @filesSelected="(newFiles) => (files = newFiles)"
        @delete="deleteImage"
        :maxFiles="5 - initialValues.moodboardImages.length"
      />
    </Fieldset>

    <Fieldset legend="Contact">
      <div class="my-2 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <AtomsInput name="phone" label="Phone Number" />
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

const genderOptions = ref([
  { name: "Male", id: "male" },
  { name: "Female", id: "female" },
]);
const interestOptions = ref<any[]>([]);
const occupationOptions = ref<any[]>([]);
const searchPreferencesOptions = ref<any[]>([]);
const searchPropertyTypeOptions = ref<any[]>([]);
const noiseCompatibilityOptions = ref<any[]>([]);
const petsCompatibilityOptions = ref<any[]>([]);

const { data: i } = await useFetch("/api/taxonomy_term/interest");
interestOptions.value = i.value || [];

const { data: occupation } = await useFetch("/api/taxonomy_term/occupation");
occupationOptions.value = occupation.value || [];

const { data: searchPreferences } = await useFetch(
  "/api/taxonomy_term/searchPreference",
);
searchPreferencesOptions.value = searchPreferences.value || [];

const { data: searchPropertyType } = await useFetch(
  "/api/taxonomy_term/propertyOption",
);
searchPropertyTypeOptions.value = searchPropertyType.value || [];

const { data: noiseCompatibility } = await useFetch(
  "/api/taxonomy_term/noiseCompatibility",
);
noiseCompatibilityOptions.value = noiseCompatibility.value || [];

const { data: petsCompatibility } = await useFetch(
  "/api/taxonomy_term/PetsCompatibility",
);
petsCompatibilityOptions.value = petsCompatibility.value || [];

const { data: j } = await useFetch("/api/user/me");
if (j.value?.user) {
  const u = j.value.user;
  u.interests = u.interests.map((i: any) => i.id || i);
  u.occupation = u.occupation.map((i: any) => i.id || i);
  u.searchPreferences = u.searchPreferences.map((i: any) => i.id || i);
  u.searchPropertyType = u.searchPropertyType.map((i: any) => i.id || i);
  u.noiseCompatibility = u.noiseCompatibility.map((i: any) => i.id || i);
  u.petsCompatibility = u.petsCompatibility.map((i: any) => i.id || i);
  initialValues.value = u;
}

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

if (initialValues.value) {
  fetchDistricts(initialValues.value.city);
}

watch(
  () => initialValues.value?.city,
  async (newCity) => {
    if (!newCity) return;
    initialValues.value.districts = [];
    await fetchDistricts(newCity);
  },
);

const resolver = ref(zodResolver(userProfileSchema));

const onFormSubmit = async ({ valid, values }: any) => {
  if (!valid) return;
  formStatus.value.isLoading = true;

  if (files.value && files.value.length) {
    const formData = new FormData();
    files.value.forEach((file) => {
      formData.append("moodboardImages", file);
    });

    const response = await $fetch("/api/files", {
      method: "POST",
      body: formData,
    });

    values.moodboardImages = [
      ...response,
      ...initialValues.value.moodboardImages,
    ];
  }

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

const props = defineProps<{ form: any }>();

provide("formContext", props.form);
</script>
