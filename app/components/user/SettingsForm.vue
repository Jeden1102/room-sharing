<template>
  <Form
    v-slot="$form"
    :initialValues="initialValues"
    :resolver="resolver"
    @submit="onFormSubmit"
    v-if="initialValues"
    class="flex w-full flex-col gap-6"
  >
    <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
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
        <FloatLabel variant="on" class="w-full">
          <InputNumber id="budgetMax" name="budgetMax" fluid />
          <label for="budgetMax">Max Budget</label>
        </FloatLabel>
        <Message
          v-if="$form.budgetMax?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.budgetMax.error.message }}
        </Message>
      </div>

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

    <FormFileUploader
      id="moodboardImages"
      name="moodboardImages"
      label="Moodboard Images"
      v-model="initialValues.moodboardImages"
      @filesSelected="(newFiles) => (files = newFiles)"
      @delete="deleteImage"
      :maxFiles="5 - initialValues.moodboardImages.length"
    />

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

    <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <FloatLabel variant="on">
          <InputText id="phone" name="phone" fluid />
          <label for="phone">Phone Number</label>
        </FloatLabel>
        <Message
          v-if="$form.phone?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.phone.error.message }}
        </Message>
      </div>
    </div>

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
  </Form>
</template>

<script setup lang="ts">
import { z } from "zod";
import { zodResolver } from "@primevue/forms/resolvers/zod";

const formStatus = ref({ success: false, message: "", isLoading: false });

const initialValues = ref<any>(null);

const files = ref<File[]>([]);

const genderOptions = ref([
  { name: "Male", id: "male" },
  { name: "Female", id: "female" },
]);
const interestOptions = ref<any[]>([]);

const { data: i } = await useFetch("/api/taxonomy_term/interests");
interestOptions.value = i.value || [];

const { data: j } = await useFetch("/api/user/me");

if (j.value?.user) {
  j.value.user.interests = j.value.user.interests.map((i: any) => i.id || i);
  initialValues.value = j.value.user;
}

const resolver = ref(
  zodResolver(
    z.object({
      firstName: z.string().min(1, { message: "First name is required" }),
      lastName: z.string().min(1, { message: "Last name is required" }),
      age: z.number().min(1).max(130),
      gender: z.string().nullable(),
      phone: z.string().min(5).max(20).optional(),
      description: z.string().max(500).optional(),
      interests: z.array(z.string()).optional(),
      smoker: z.boolean().nullable(),
      pets: z.boolean().nullable(),
      budgetMax: z.number().nullable(),
      moodboardImages: z.array(z.string()).optional(),
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
