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
          v-if="initialValues?.status"
          :severity="initialValues?.status === 'ACTIVE' ? 'success' : 'warning'"
        >
          {{ $t(`taxonomies.status.${initialValues?.status?.toLowerCase()}`) }}
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
          <span class="text-xs text-gray-500">
            {{ $t("propertyForm.basicData.priceHint") }}
          </span>
        </div>
        <AtomsNumber
          name="deposit"
          :label="$t('propertyForm.basicData.deposit')"
          :form="$form"
        />
      </div>

      <AtomsBaseCkeditor
        name="description"
        :label="$t('propertyForm.basicData.description')"
        :form="$form"
      />
    </Fieldset>

    <Fieldset
      v-if="$form.type?.value !== 'ROOM'"
      :legend="$t('propertyForm.subProperties.legend')"
    >
      <div class="grid md:grid-cols-2">
        <div class="mt-2 flex flex-col gap-4">
          <p class="text-sm font-light">
            {{ $t("propertyForm.subProperties.extraHint") }}
          </p>
          <FloatLabel variant="on">
            <MultiSelect
              v-model="initialValues.subPropertyIds"
              :options="userProperties"
              optionLabel="title"
              optionValue="id"
              filter
              :placeholder="$t('propertyForm.subProperties.selectPlaceholder')"
              class="w-full"
              display="chip"
              :emptyFilterMessage="$t('ui.noResultsFound')"
              :emptyMessage="$t('ui.noResultsFound')"
            />
          </FloatLabel>
          <p class="text-sm font-light">
            {{ $t("propertyForm.subProperties.hint") }}
          </p>
        </div>
      </div>
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
          v-if="$form.type?.value !== 'ROOM'"
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
        <AtomsBaseCheckbox
          :name="amenity.value"
          :label="amenity.label"
          :form="$form"
          v-for="amenity in amenitiesOptions()"
          :key="amenity.value"
        />
      </div>
    </Fieldset>

    <Fieldset :legend="$t('propertyForm.media.legend')">
      <div class="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4">
        <AtomsBaseCheckbox
          :name="media.value"
          :label="media.label"
          :form="$form"
          v-for="media in mediasOptions()"
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
  property?: Property & { subProperties?: Property[] };
}>();

const initialValues = ref<any>(
  props.property
    ? {
        ...props.property,
        subPropertyIds: props.property.subProperties?.map((p) => p.id) || [],
      }
    : {
        city: null,
        subPropertyIds: [],
      },
);

const formStatus = ref({ success: false, message: "", isLoading: false });
const files = ref<File[]>([]);
const imageUris = ref<string[]>(initialValues.value?.images || []);
const userProperties = ref<{ id: string; title: string; type: string }[]>([]);

const filteredCities = ref<string[]>([]);
const availableDistricts = ref<string[]>([]);
const filteredStreets = ref<string[]>([]);
const availableStreets = ref<string[]>([]);

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

const fetchUserProperties = async () => {
  try {
    const data = await $fetch<any>("/api/properties/my-childrens");
    if (data?.properties) {
      userProperties.value = data.properties.filter(
        (p: any) => p.id !== props.property?.id,
      );
    }
  } catch (e) {
    console.error(e);
  }
};

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
    const res = await $fetch<any>(
      `/api/geo/autocomplete?q=${encodeURIComponent(q)}`,
    );
    filteredCities.value =
      res?.predictions?.map((p: any) => p.description.split(",")[0]) || [];
  } catch (e) {
    console.error(e);
  }
};

const searchStreet = async (event: { query: string }) => {
  const q = event.query?.trim();
  if (!q) return;
  filteredStreets.value = availableStreets.value.filter((s) =>
    s.toLowerCase().includes(q.toLowerCase()),
  );
};

const fetchDistricts = async (city: string) => {
  if (!city) return;
  try {
    const districtRes = await $fetch<any>(
      `/api/geo/districts?city=${encodeURIComponent(city)}`,
    );
    availableDistricts.value = districtRes.districts || [];
  } catch (e) {
    console.error(e);
  }
};

const fetchStreets = async (city: string) => {
  if (!city) return;
  try {
    const streetsRes = await $fetch<any>(
      `/api/geo/streets?city=${encodeURIComponent(city)}`,
    );
    availableStreets.value = streetsRes.streets || [];
  } catch (e) {
    console.error(e);
  }
};

watch(
  () => initialValues.value?.city,
  async (newCity) => {
    if (!newCity || newCity.length < 3) return;
    initialValues.value.district = null;
    initialValues.value.street = null;
    await Promise.all([fetchDistricts(newCity), fetchStreets(newCity)]);
  },
);

const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();
const { t } = useI18n();

onMounted(async () => {
  if (route.query.type) {
    initialValues.value.type = route.query.type;
  }

  if (props.property) {
    await Promise.all([
      fetchDistricts(props.property.city),
      fetchStreets(props.property.city),
    ]);
    if (props.property.type !== "ROOM") {
      await fetchUserProperties();
    }
  } else {
    await fetchUserProperties();
  }
});

const apiUri = computed(() => {
  return props.property ? "/api/property/update" : "/api/property/create";
});

const onSetAsPrimary = async (idx: number) => {
  await $fetch(apiUri.value, {
    method: "POST",
    body: {
      ...initialValues.value,
      mainImageIdx: idx,
    },
  });
};

const onFormSubmit = async ({ valid, values, reset }: any) => {
  if (!valid) return;
  formStatus.value.isLoading = true;
  formStatus.value.message = "";

  try {
    if (files.value?.length) {
      const fd = new FormData();
      files.value.forEach((file) => fd.append("files", file));
      const uploadRes = await $fetch<string[]>("/api/files", {
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
    values.subPropertyIds = initialValues.value.subPropertyIds;

    if (availableDistricts.value?.length === 0) {
      values.district = null;
    }

    if (!values.mainImageIdx) {
      values.mainImageIdx = 0;
    }

    values.description = values.description.replaceAll("&nbsp;", " ");

    const res = await $fetch<any>(apiUri.value, {
      method: "POST",
      body: values,
    });

    formStatus.value.success = true;
    formStatus.value.message = props.property
      ? t("propertyForm.response.edit")
      : t("propertyForm.response.add");

    if (!props.property) {
      reset();
      router.push(
        localePath({
          name: "property-id",
          params: { id: slugify(res.property.title) },
          query: { id: res.property.id },
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
