<template>
  <div v-if="isLoading" class="grid w-full gap-2.5 md:grid-cols-2">
    <Skeleton height="48px" />
    <Skeleton height="48px" />
    <Skeleton height="48px" />
    <Skeleton height="48px" />
    <Skeleton height="48px" />
    <Skeleton height="48px" />
    <Skeleton height="208px" class="col-span-2" />
  </div>

  <Form
    v-else
    v-slot="$form"
    :initialValues="initialValues"
    :resolver="resolver"
    @submit="onFormSubmit"
    class="flex w-full flex-col gap-6"
  >
    <Message severity="secondary" class="py-2">
      <div class="flex items-center gap-2">
        <p class="font-medium">
          {{
            property
              ? $t("propertyForm.editingProperty")
              : $t("propertyForm.addingProperty")
          }}
        </p>
        <Badge
          :severity="initialValues?.status === 'ACTIVE' ? 'success' : 'warning'"
        >
          {{ initialValues?.status || "draft" }}
        </Badge>
      </div>
      <p class="mt-1.5 text-sm font-light" v-if="!property">
        {{ $t("propertyForm.addBasicInfo") }}
      </p>
      <AtomsDropdown
        class="mt-4"
        v-if="property"
        name="status"
        label="Status"
        :options="statusOptions"
        optionLabel="label"
        optionValue="value"
        :form="$form"
      />
    </Message>

    <Fieldset :legend="$t('propertyForm.basicData.legend')">
      <div class="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        <AtomsInput
          name="title"
          :label="$t('propertyForm.basicData.title')"
          :form="$form"
        />
        <AtomsDropdown
          name="type"
          :label="$t('propertyForm.basicData.propertyType')"
          :options="typeOptions"
          optionLabel="label"
          optionValue="value"
          :form="$form"
        />

        <AtomsDropdown
          name="listingType"
          :label="$t('propertyForm.basicData.listingType')"
          :options="listingOptions"
          optionLabel="label"
          optionValue="value"
          :form="$form"
        />
      </div>

      <div class="my-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <AtomsNumber
            name="price"
            :label="$t('propertyForm.basicData.price')"
            :form="$form"
          />
        </div>
        <AtomsNumber
          name="deposit"
          :label="$t('propertyForm.basicData.deposit')"
          :form="$form"
        />
      </div>

      <AtomsBaseTextarea
        name="description"
        :label="$t('propertyForm.basicData.description')"
        :rows="4"
        :form="$form"
      />
    </Fieldset>

    <Fieldset :legend="$t('propertyForm.location.legend')">
      <div class="mt-2 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <AtomsAutocomplete
          name="city"
          :label="$t('propertyForm.location.city')"
          :suggestions="filteredCities"
          v-model="initialValues.city"
          @complete="searchCity"
          :form="$form"
        />

        <div
          v-if="
            availableDistricts?.length > 0 ||
            (initialValues?.district && initialValues?.district?.length)
          "
        >
          <FloatLabel variant="on">
            <AtomsDropdown
              id="district"
              name="district"
              :options="availableDistricts"
              display="chip"
              :placeholder="$t('propertyForm.location.districtPlaceholder')"
              :label="$t('propertyForm.location.district')"
              :form="$form"
              fluid
            />
          </FloatLabel>
        </div>

        <div v-if="availableStreets">
          <AtomsAutocomplete
            v-if="availableStreets?.length"
            name="street"
            :label="$t('propertyForm.location.street')"
            @complete="searchStreet"
            :suggestions="filteredStreets"
            :placeholder="$t('propertyForm.location.streetPlaceholder')"
            :form="$form"
          />
        </div>

        <AtomsInput
          name="buildingNumber"
          :label="$t('propertyForm.location.buildingNumber')"
          :form="$form"
        />
      </div>
      <span class="text-xs text-gray-500">
        {{ $t("propertyForm.location.hint") }}
      </span>
    </Fieldset>

    <Fieldset :legend="$t('propertyForm.sizeAndLocation.legend')">
      <div class="mt-2 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <AtomsNumber
          name="sizeM2"
          :label="$t('propertyForm.sizeAndLocation.size')"
          :form="$form"
        />
        <AtomsNumber
          name="rooms"
          :label="$t('propertyForm.sizeAndLocation.rooms')"
          :form="$form"
        />
        <AtomsNumber
          name="floor"
          :label="$t('propertyForm.sizeAndLocation.floor')"
          :form="$form"
        />
        <AtomsNumber
          name="yearBuilt"
          :label="$t('propertyForm.sizeAndLocation.yearBuilt')"
          :form="$form"
        />
      </div>
    </Fieldset>

    <Fieldset :legend="$t('propertyForm.amenities.legend')">
      <div class="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4">
        <AtomsCheckbox
          :name="amenity.value"
          :label="amenity.label"
          :form="$form"
          v-for="amenity in amenitiesOptions"
          :key="amenity.value"
        />
      </div>
    </Fieldset>

    <Fieldset :legend="$t('propertyForm.media.legend')">
      <div class="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4">
        <AtomsCheckbox
          :name="media.value"
          :label="media.label"
          :form="$form"
          v-for="media in mediasOptions"
          :key="media.value"
        />
      </div>
    </Fieldset>

    <Fieldset :legend="$t('propertyForm.images.legend')">
      <FormFileUploader
        id="propertyImages"
        name="images"
        :label="$t('propertyForm.images.label')"
        v-model="imageUris"
        @filesSelected="onFilesSelected"
        @delete="onDeleteImage"
        :maxFiles="10 - (initialValues?.images?.length || 0)"
        :form="$form"
        :can-set-primary="true"
        @setAsPrimary="onSetAsPrimary"
        :primaryImageIdx="initialValues?.mainImageIdx"
        :maxFileSize="5500000"
      />
    </Fieldset>

    <Fieldset :legend="$t('propertyForm.contact.legend')">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <AtomsInput
          name="ownerId"
          :label="$t('propertyForm.contact.ownerId')"
          :form="$form"
          v-if="false"
        />
        <AtomsInput
          name="phone"
          :label="$t('propertyForm.contact.phone')"
          :form="$form"
        />
        <AtomsInput
          name="email"
          :label="$t('propertyForm.contact.email')"
          :form="$form"
        />
      </div>
    </Fieldset>

    <div
      class="sticky bottom-17 left-0 z-10 flex flex-col gap-2 bg-white py-2 lg:bottom-0"
    >
      <div class="flex items-center gap-3">
        <Button
          type="submit"
          :label="
            property
              ? $t('propertyForm.submit.edit')
              : $t('propertyForm.submit.add')
          "
          :loading="formStatus.isLoading"
        />

        <Button v-if="property" asChild v-slot="slotProps" severity="secondary">
          <RouterLink
            :to="
              $localePath({
                name: 'property-id',
                params: {
                  id: slugify(property.title),
                },
                query: { id: property.id },
              })
            "
            :class="slotProps.class"
            >{{ $t("propertyForm.submit.preview") }}</RouterLink
          >
        </Button>
      </div>

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
import { propertyCreateSchema } from "~/schemas/property";
import type { Property } from "@prisma/client";

const props = defineProps<{
  property?: Property;
}>();

const initialValues = ref<any>(
  props.property || {
    city: null,
  },
);

const formStatus = ref({ success: false, message: "", isLoading: false });
const files = ref<File[]>([]);
const imageUris = ref<string[]>(initialValues.value?.images || []);

const filteredCities = ref<string[]>([]);
const availableDistricts = ref<string[]>([]);

const {
  propertyTypeOptions,
  listingTypeOptions,
  amenitiesOptions,
  mediasOptions,
  statusOptions,
} = useTaxonomies();

const typeOptions = computed(() => {
  return propertyTypeOptions.filter(
    (o: { label: string; value: string | null }) => o.value !== null,
  );
});

const listingOptions = computed(() => {
  return listingTypeOptions.filter(
    (o: { label: string; value: string | null }) => o.value !== null,
  );
});

const isLoading = ref(false);

const resolver = ref(zodResolver(propertyCreateSchema));
const onFilesSelected = (newFiles: File[]) => {
  files.value = newFiles;
};

const onDeleteImage = async (uri: string) => {
  imageUris.value = imageUris.value.filter((i) => i !== uri);

  try {
    await $fetch("/api/files/delete", {
      method: "POST",
      body: {
        uri,
        entity: "property",
        field: "images",
        images: imageUris.value,
        id: initialValues.value.id,
      },
    });

    initialValues.value.images = imageUris.value;
  } catch (e) {
    console.error(e);
  }
};

const searchCity = async (event: { query: string }) => {
  const q = event.query?.trim();
  if (!q) return (filteredCities.value = []);
  try {
    const res = await $fetch(
      `/api/geo/autocomplete?q=${encodeURIComponent(q)}`,
    );
    filteredCities.value =
      res?.predictions?.map((p: any) => p.description.split(",")[0]) || [];
  } catch (e) {
    console.error("autocomplete error", e);
  }
};

const filteredStreets = ref<string[]>([]);

const searchStreet = async (event: { query: string }) => {
  const q = event.query?.trim();
  if (!q) return (filteredCities.value = []);

  filteredStreets.value = availableStreets.value.filter((s) =>
    s.toLowerCase().includes(q.toLowerCase()),
  );
};

const fetchDistricts = async (city: string) => {
  if (!city) return;
  try {
    availableDistricts.value = [];
    const districtRes = await $fetch(
      `/api/geo/districts?city=${encodeURIComponent(city)}`,
    );
    availableDistricts.value = districtRes.districts || [];
  } catch (e) {
    console.error(e);
  }
};

const availableStreets = ref<string[]>([]);

const fetchStreets = async (city: string) => {
  if (!city) return;
  try {
    availableStreets.value = [];
    const streetsRes = await $fetch(
      `/api/geo/streets?city=${encodeURIComponent(city)}`,
    );
    availableStreets.value = streetsRes.streets || [];
  } catch (e) {
    console.error("fetch streets error", e);
  }
};

watch(
  () => initialValues.value?.city,
  async (newCity, oldCity) => {
    if (!newCity) return;

    initialValues.value.district = null;
    initialValues.value.street = null;

    if (newCity.length < 3) return;

    await Promise.all([fetchDistricts(newCity), fetchStreets(newCity)]);
  },
);

onMounted(async () => {
  if (props.property) {
    await fetchDistricts(props.property.city);
    await fetchStreets(props.property.city);
  }
});

const apiUri = computed(() => {
  return props.property ? "/api/property/update" : "/api/property/create";
});

const onSetAsPrimary = async (idx: number) => {
  await useFetch(apiUri.value, {
    method: "POST",
    body: {
      ...initialValues.value,
      mainImageIdx: idx,
    },
  });
};

const router = useRouter();
const localePath = useLocalePath();
const { t } = useI18n();

const onFormSubmit = async ({ valid, values, reset }: any) => {
  if (!valid) return;
  formStatus.value.isLoading = true;
  formStatus.value.message = "";

  try {
    if (files.value?.length) {
      const fd = new FormData();

      files.value.forEach((file) => {
        fd.append("files", file);
      });

      const uploadRes = await $fetch("/api/files", {
        method: "POST",
        body: fd,
      });
      const allImages = [
        ...(initialValues.value.images || []),
        ...(uploadRes || []),
      ];

      values.images = allImages;
      imageUris.value = allImages;
      files.value = [];
    } else {
      values.images = imageUris.value || values.images || [];
    }

    values.id = props.property?.id;

    if (availableDistricts.value?.length === 0) {
      values.district = null;
    }

    const { data, error }: { data: any; error: any } = await useFetch(
      apiUri.value,
      {
        method: "POST",
        body: values,
      },
    );

    if (error.value)
      throw new Error(error.value.message || t("propertyForm.response.error"));

    formStatus.value.success = true;
    formStatus.value.message = props.property
      ? t("propertyForm.response.edit")
      : t("propertyForm.response.add");

    if (!props.property) {
      reset();

      const newProperty = data.value.property;

      router.push(
        localePath({
          name: "property-id",
          params: {
            id: slugify(newProperty.title),
          },
          query: { id: newProperty.id },
        }),
      );
    }
  } catch (err: any) {
    console.error(err);
    formStatus.value.success = false;
    formStatus.value.message = err?.message || t("propertyForm.response.error");
  } finally {
    formStatus.value.isLoading = false;
  }
};
</script>
