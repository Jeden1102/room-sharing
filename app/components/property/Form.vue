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
          {{ property ? "Edytujesz nieruchomość" : "Dodajesz nieruchomość" }}
        </p>
        <Badge
          :severity="initialValues?.status === 'ACTIVE' ? 'success' : 'warning'"
        >
          {{ initialValues?.status || "draft" }}
        </Badge>
      </div>
      <p class="mt-1.5 text-sm font-light" v-if="!property">
        Dodaj podstawowe informacje o ofercie — możesz je edytować później.
      </p>
    </Message>

    <Fieldset legend="Dane podstawowe">
      <div class="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        <AtomsInput name="title" label="Tytuł*" :form="$form" />
        <AtomsDropdown
          name="type"
          label="Typ nieruchomości*"
          :options="typeOptions"
          optionLabel="label"
          optionValue="value"
          :form="$form"
        />

        <AtomsDropdown
          name="listingType"
          label="Na wynajem/Na sprzedaz*"
          :options="listingOptions"
          optionLabel="label"
          optionValue="value"
          :form="$form"
        />
      </div>

      <div class="my-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <AtomsNumber name="price" label="Cena (PLN)*" :form="$form" />
          <span class="text-xs text-gray-500"
            >Jeśli mieszkanie jest dzielone, podaj cenę najtańszego
            pokoju.</span
          >
        </div>
        <AtomsNumber name="deposit" label="Kaucja (PLN)" :form="$form" />
      </div>

      <AtomsBaseTextarea
        name="description"
        label="Opis*"
        :rows="4"
        :form="$form"
      />
    </Fieldset>

    <Fieldset legend="Lokalizacja">
      <div class="mt-2 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <AtomsAutocomplete
          name="city"
          label="Miasto*"
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
              placeholder="Wybierz dzielnicę"
              label="Dzielnica"
              :form="$form"
              fluid
            />
          </FloatLabel>
        </div>

        <div v-if="availableStreets">
          <AtomsAutocomplete
            v-if="availableStreets?.length"
            name="street"
            label="Ulica"
            @complete="searchStreet"
            :suggestions="filteredStreets"
            placeholder="Wybierz ulicę"
            :form="$form"
          />
        </div>

        <AtomsInput name="buildingNumber" label="Numer budynku" :form="$form" />
      </div>
      <span class="text-xs text-gray-500"
        >Podaj dokładne dane, aby nieruchomość pojawiała na mapie</span
      >
    </Fieldset>

    <Fieldset legend="Wielkość & połozenie">
      <div class="mt-2 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <AtomsNumber name="sizeM2" label="Powierzchnia (m²)*" :form="$form" />
        <AtomsNumber name="rooms" label="Liczba pokoi*" :form="$form" />
        <AtomsNumber name="floor" label="Piętro" :form="$form" />
        <AtomsNumber name="yearBuilt" label="Rok budowy" :form="$form" />
      </div>
    </Fieldset>
    <Fieldset legend="Udogodnienia i warunki">
      <div class="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4">
        <div class="flex flex-col gap-2">
          <AtomsCheckbox name="furnished" label="Umeblowane" :form="$form" />
          <AtomsCheckbox name="balcony" label="Balkon" :form="$form" />
          <AtomsCheckbox name="elevator" label="Winda" :form="$form" />
        </div>

        <div class="flex flex-col gap-2">
          <AtomsCheckbox
            name="parking"
            label="Miejsce parkingowe"
            :form="$form"
          />
          <AtomsCheckbox
            name="petsAllowed"
            label="Zwierzęta dozwolone"
            :form="$form"
          />
          <AtomsCheckbox
            name="smokingAllowed"
            label="Palenie dozwolone"
            :form="$form"
          />
        </div>

        <div class="flex flex-col gap-2">
          <AtomsCheckbox name="washingMachine" label="Pralka" :form="$form" />
          <AtomsCheckbox name="dishwasher" label="Zmywarka" :form="$form" />
          <AtomsCheckbox
            name="airConditioning"
            label="Klimatyzacja"
            :form="$form"
          />
        </div>
      </div>

      <div class="mt-2">
        <div class="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
          <AtomsCheckbox
            name="isShared"
            label="Dzielone (pod wynajem pokojów)"
            :form="$form"
          />
          <p class="text-muted text-sm">
            Jeśli zaznaczone - pokażą się pola dla współlokatorów/typ pokoju.
          </p>
        </div>
      </div>
    </Fieldset>

    <Fieldset legend="Media">
      <div class="flex flex-col gap-2">
        <AtomsCheckbox name="internet" label="Internet" :form="$form" />
        <AtomsCheckbox name="tv" label="Telewizja" :form="$form" />
      </div>
    </Fieldset>

    <Fieldset legend="Media (zdjęcia)">
      <FormFileUploader
        id="propertyImages"
        name="images"
        label="Zdjęcia nieruchomości"
        v-model="imageUris"
        @filesSelected="onFilesSelected"
        @delete="onDeleteImage"
        :maxFiles="20 - (initialValues?.images?.length || 0)"
        :form="$form"
        :can-set-primary="true"
        @setAsPrimary="onSetAsPrimary"
        :primaryImageIdx="initialValues?.mainImageIdx"
      />
    </Fieldset>

    <Fieldset legend="Kontakt / właściciel">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <AtomsInput
          name="ownerId"
          label="ownerId (ukryte dla zwykłych użytkowników)"
          :form="$form"
          v-if="false"
        />
        <AtomsInput name="phone" label="Numer kontaktowy" :form="$form" />
        <AtomsInput name="email" label="E-mail" :form="$form" />
      </div>
    </Fieldset>

    <div
      class="sticky bottom-17 left-0 z-10 flex flex-col gap-2 bg-white py-2 lg:bottom-0"
    >
      <div class="flex items-center gap-3">
        <Button
          type="submit"
          :label="property ? 'Zapisz zmiany' : 'Dodaj ofertę'"
          :loading="formStatus.isLoading"
        />
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
import { AtomsAutocomplete, AtomsDropdown } from "#components";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { propertyCreateSchema } from "~/schemas/property";

const props = defineProps<{
  property?: any;
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
const availableDistricts = ref<any[]>([]);

const typeOptions = [
  { label: "Mieszkanie", value: "APARTMENT" },
  { label: "Dom", value: "HOUSE" },
  { label: "Pokój", value: "ROOM" },
  { label: "Studio", value: "STUDIO" },
];

const listingOptions = [
  { label: "Na wynajem", value: "RENT" },
  { label: "Na sprzedaz", value: "SALE" },
];

const isLoading = ref(false);

const resolver = ref(zodResolver(propertyCreateSchema));
const onFilesSelected = (newFiles: File[]) => {
  files.value = newFiles;
};

const onDeleteImage = (uri: string) => {
  imageUris.value = imageUris.value.filter((i) => i !== uri);
};

const searchCity = async (event: any) => {
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

const filteredStreets = ref<any>([]);

const searchStreet = async (event: any) => {
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

const availableStreets = ref<any[]>([]);

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

const onFormSubmit = async ({ valid, values, reset }: any) => {
  if (!valid) return;
  formStatus.value.isLoading = true;
  formStatus.value.message = "";

  try {
    if (files.value?.length) {
      const fd = new FormData();
      files.value.forEach((f) => fd.append("files", f));
      const uploadRes = await $fetch("/api/files", {
        method: "POST",
        body: fd,
      });
      values.images = [
        ...(initialValues.value.images || []),
        ...(uploadRes || []),
      ];
    } else {
      values.images = imageUris.value || values.images || [];
    }

    values.id = props.property?.id;

    if (availableDistricts.value?.length === 0) {
      values.district = null;
    }

    const { data, error } = await useFetch(apiUri.value, {
      method: "POST",
      body: values,
    });

    if (error.value) throw new Error(error.value.message || "Błąd serwera");

    formStatus.value.success = true;
    formStatus.value.message = props.property
      ? "Zaktualizowano ofertę"
      : "Oferta dodana pomyślnie";

    if (!props.property) {
      reset();
    }
  } catch (err: any) {
    console.error(err);
    formStatus.value.success = false;
    formStatus.value.message = err?.message || "Błąd zapisu";
  } finally {
    formStatus.value.isLoading = false;
  }
};
</script>
