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
          <div>
            <FloatLabel variant="on">
              <InputText id="firstName" name="firstName" fluid />
              <label for="firstName">First Name</label>
            </FloatLabel>
            <Message
              v-if="$form.firstName?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.firstName.error.message }}
            </Message>
          </div>

          <div>
            <FloatLabel variant="on">
              <InputText id="lastName" name="lastName" fluid />
              <label for="lastName">Last Name</label>
            </FloatLabel>
            <Message
              v-if="$form.lastName?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.lastName.error.message }}
            </Message>
          </div>
        </div>

        <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <FloatLabel variant="on">
              <InputNumber id="age" name="age" fluid />
              <label for="age">Age</label>
            </FloatLabel>
            <Message
              v-if="$form.age?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.age.error.message }}
            </Message>
          </div>

          <div>
            <FloatLabel variant="on">
              <Dropdown
                id="gender"
                name="gender"
                :options="genderOptions"
                optionLabel="name"
                optionValue="id"
                fluid
              />
              <label for="gender">Gender</label>
            </FloatLabel>
            <Message
              v-if="$form.gender?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.gender.error.message }}
            </Message>
          </div>
        </div>

        <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <FloatLabel variant="on">
              <MultiSelect
                id="interests"
                name="interests"
                :options="interestOptions"
                optionLabel="name"
                optionValue="id"
                display="chip"
                placeholder="Select interests"
                fluid
              />
              <label for="interests">Interests</label>
            </FloatLabel>
            <Message
              v-if="$form.interests?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.interests.error.message }}
            </Message>
          </div>

          <div>
            <FloatLabel variant="on">
              <MultiSelect
                id="occupation"
                name="occupation"
                :options="occupationOptions"
                optionLabel="name"
                optionValue="id"
                display="chip"
                placeholder="Select occupation options"
                fluid
              />
              <label for="occupation">Occupation</label>
            </FloatLabel>
            <Message
              v-if="$form.occupation?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.occupation.error.message }}
            </Message>
          </div>
        </div>

        <div class="flex gap-6">
          <div class="flex flex-row items-center gap-2">
            <Checkbox id="smoker" name="smoker" binary />
            <label for="smoker">Smoker</label>
          </div>
          <div class="flex flex-row items-center gap-2">
            <Checkbox id="pets" name="pets" binary />
            <label for="pets">Has pets</label>
          </div>
        </div>

        <div>
          <FloatLabel variant="on" class="w-full">
            <Textarea
              id="description"
              name="description"
              autoResize
              rows="4"
              fluid
            />
            <label for="description">Description</label>
          </FloatLabel>
          <Message
            v-if="$form.description?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.description.error.message }}
          </Message>
        </div>
      </div>
    </Fieldset>

    <Fieldset legend="Search location">
      <div class="mt-2 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <FloatLabel variant="on">
            <AutoComplete
              id="city"
              name="city"
              v-model="city"
              :suggestions="filteredCities"
              @complete="searchCity"
              placeholder="Wpisz miasto"
              fluid
            />
            <label for="city">City</label>
          </FloatLabel>
        </div>
        <div v-if="availableDistricts?.length > 0 || selectedDistrict">
          <FloatLabel variant="on">
            <MultiSelect
              id="districts"
              name="districts"
              v-model="selectedDistrict"
              :options="availableDistricts"
              display="chip"
              placeholder="Wybierz dzielnicę"
              fluid
            />
          </FloatLabel>
        </div>
      </div>
    </Fieldset>

    <Fieldset legend="Search preferences">
      <div class="my-2 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <FloatLabel variant="on">
            <MultiSelect
              id="searchPreferences"
              name="searchPreferences"
              :options="searchPreferencesOptions"
              optionLabel="name"
              optionValue="id"
              display="chip"
              placeholder="Select search preferences"
              fluid
            />
            <label for="searchPreferences">Search preferences</label>
          </FloatLabel>
          <Message
            v-if="$form.searchPreferences?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.searchPreferences.error.message }}
          </Message>
        </div>

        <div>
          <FloatLabel variant="on">
            <MultiSelect
              id="searchPropertyType"
              name="searchPropertyType"
              :options="searchPropertyTypeOptions"
              optionLabel="name"
              optionValue="id"
              display="chip"
              placeholder="Select property type"
              fluid
            />
            <label for="searchPropertyType">Search property type</label>
          </FloatLabel>
        </div>

        <div>
          <FloatLabel variant="on" class="w-full">
            <InputNumber id="budgetMax" name="budgetMax" fluid />
            <label for="budgetMax">Max Budget</label>
          </FloatLabel>
        </div>
      </div>
    </Fieldset>

    <Fieldset legend="Compatibility">
      <div class="my-2 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <FloatLabel variant="on">
            <MultiSelect
              id="noiseCompatibility"
              name="noiseCompatibility"
              :options="noiseCompatibilityOptions"
              optionLabel="name"
              optionValue="id"
              display="chip"
              placeholder="Select noise compatibility"
              fluid
            />
            <label for="noiseCompatibility">Noise compatibility</label>
          </FloatLabel>
        </div>

        <div>
          <FloatLabel variant="on">
            <MultiSelect
              id="petsCompatibility"
              name="petsCompatibility"
              :options="petsCompatibilityOptions"
              optionLabel="name"
              optionValue="id"
              display="chip"
              placeholder="Select pets compatibility"
              fluid
            />
            <label for="petsCompatibility">Pets compatibility</label>
          </FloatLabel>
        </div>
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
        <div>
          <FloatLabel variant="on">
            <InputText id="phone" name="phone" fluid />
            <label for="phone">Phone Number</label>
          </FloatLabel>
        </div>
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
import { z } from "zod";
import { zodResolver } from "@primevue/forms/resolvers/zod";

const formStatus = ref({ success: false, message: "", isLoading: false });
const initialValues = ref<any>(null);
const files = ref<File[]>([]);
const city = ref<any>(null);
const filteredCities = ref<any[]>([]);
const availableDistricts = ref<any[]>();
const selectedDistrict = ref<any>(null);

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
    selectedDistrict.value = null;
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

watch(city, async (newCity) => {
  if (!newCity) return;
  initialValues.value.districts = [];
  fetchDistricts(newCity);
});

const resolver = ref(
  zodResolver(
    z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      age: z.number().min(1).max(130).optional().nullable(),
      gender: z.string().nullable(),
      phone: z.string().min(5).max(20).optional(),
      description: z.string().max(2048).optional(),
      interests: z.array(z.string()).optional(),
      occupation: z.array(z.string()).optional(),
      searchPreferences: z.array(z.string()).optional(),
      searchPropertyType: z.array(z.string()).optional(),
      noiseCompatibility: z.array(z.string()).optional(),
      petsCompatibility: z.array(z.string()).optional(),
      smoker: z.boolean().nullable(),
      pets: z.boolean().nullable(),
      budgetMax: z.number().min(1).max(99999999).nullable(),
      moodboardImages: z.array(z.string()).optional(),
      city: z.string(),
      districts: z.array(z.string()).optional(),
    }),
  ),
);

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
</script>
