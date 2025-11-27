import { PrismaClient, ListingType, PropertyStatus } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const TOTAL_USERS = 500;
const TOTAL_PROPERTIES = 300;

const CITY_DISTRICTS: Record<string, string[]> = {
  Warszawa: ["Śródmieście", "Mokotów", "Ursynów", "Wola", "Praga", "Żoliborz"],
  Kraków: ["Kazimierz", "Krowodrza", "Podgórze", "Nowa Huta", "Zwierzyniec"],
  Gdańsk: ["Wrzeszcz", "Oliwa", "Stare Miasto", "Osowa"],
  Wrocław: ["Krzyki", "Psie Pole", "Śródmieście", "Fabryczna"],
  Katowice: ["Ligota", "Śródmieście", "Załęże"],
  Opole: ["Zaodrze", "Śródmieście"],
  Łódź: ["Bałuty", "Śródmieście", "Górna"],
};

const ALL_CITIES = Object.keys(CITY_DISTRICTS);

const generateUser = () => {
  return {
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int({ min: 18, max: 75 }),
    profileImage: faker.image.avatar(),
    smoker: faker.datatype.boolean(),
    pets: faker.datatype.boolean(),
    budgetMax: faker.number.int({ min: 1000, max: 8000 }),
    propertyId: null,
    emailVerificationCode: faker.string.uuid(),
    emailVerified: true,
    profileVisible: true,
    provider: null,
    providerAccountId: null,
    passwordResetCode: null,
    bgImage: faker.image.urlLoremFlickr({ category: "people" }),
    description: faker.lorem.sentences({ min: 3, max: 10 }, "\n"),
    gender: faker.person.sex(),
    moodboardImages: faker.helpers.arrayElements(
      Array.from({ length: 10 }, () =>
        faker.image.urlLoremFlickr({ category: "architecture" }),
      ),
      { min: 1, max: 5 },
    ),
    phone: faker.phone.number(),

    // city + districts
    city: faker.helpers.arrayElement(ALL_CITIES),
    districts: faker.helpers.arrayElements(
      ["Centrum", "Wilda", "Jeżyce", "Grunwald", "Rataje", "Łazarz"],
      { min: 1, max: 3 },
    ),

    searchAmount: faker.finance.amount(500, 5000, 0),

    interests: faker.helpers.arrayElements(
      ["sports", "music", "travel", "cooking", "reading", "gaming"],
      { min: 1, max: 4 },
    ),
    occupations: faker.helpers.arrayElements(
      ["student", "remote_worker", "worker", "unemployed"],
      { min: 1, max: 2 },
    ),
    searchPreferences: faker.helpers.arrayElements(
      ["quiet", "central", "non-smoker", "gym"],
      { min: 1, max: 3 },
    ),
    searchPropertyTypes: faker.helpers.arrayElements(
      ["apartment", "house", "studio", "room", "loft"],
      { min: 1, max: 2 },
    ),
    noiseCompatibility: faker.helpers.arrayElements(
      ["very_quiet", "quiet", "moderate", "low", "very_low"],
      { min: 1, max: 3 },
    ),
    petsCompatibility: faker.helpers.arrayElements(
      ["no_pets", "cats", "dogs"],
      { min: 1, max: 3 },
    ),
  };
};

/* -------------------------------------------------
   PROPERTY SEEDER
------------------------------------------------- */
const generateProperty = (ownerId: string) => {
  const city = faker.helpers.arrayElement(ALL_CITIES);
  const district = faker.helpers.arrayElement(CITY_DISTRICTS[city]);

  return {
    ownerId,
    title: faker.lorem.sentence(4),
    description: faker.lorem.sentences(3),
    price: faker.number.int({ min: 800, max: 8000 }),
    deposit: faker.number.int({ min: 0, max: 8000 }),
    city,
    district,
    street: faker.location.street(),
    buildingNumber: faker.string.numeric({ length: 2 }),
    latitude: faker.location.latitude({ max: 54, min: 50 }),
    longitude: faker.location.longitude({ max: 23, min: 14 }),

    listingType: faker.helpers.arrayElement([
      ListingType.RENT,
      ListingType.SALE,
    ]),

    type: faker.helpers.arrayElement([
      "APARTMENT",
      "HOUSE",
      "ROOM",
      "STUDIO",
    ]),

    status: faker.helpers.arrayElement([
      PropertyStatus.DRAFT,
      PropertyStatus.ACTIVE,
      PropertyStatus.RESERVED,
    ]),

    sizeM2: faker.number.int({ min: 18, max: 120 }),
    rooms: faker.number.int({ min: 1, max: 5 }),
    floor: faker.number.int({ min: 0, max: 10 }),
    yearBuilt: faker.number.int({ min: 1960, max: 2022 }),

    furnished: faker.datatype.boolean(),
    balcony: faker.datatype.boolean(),
    elevator: faker.datatype.boolean(),
    parking: faker.datatype.boolean(),
    petsAllowed: faker.datatype.boolean(),
    smokingAllowed: faker.datatype.boolean(),

    internet: faker.datatype.boolean(),
    tv: faker.datatype.boolean(),
    washingMachine: faker.datatype.boolean(),
    dishwasher: faker.datatype.boolean(),
    airConditioning: faker.datatype.boolean(),

    isShared: faker.datatype.boolean(),
    roomType: faker.helpers.arrayElement(["single", "double", "shared"]),

    images: Array.from({ length: faker.number.int({ min: 2, max: 6 }) }).map(() =>
      faker.image.urlLoremFlickr({ category: "apartment" })
    ),
    mainImageIdx: 0,

    email: faker.internet.email(),
    phone: faker.phone.number(),
  };
};

async function main() {
  await prisma.property.deleteMany();
  await prisma.user.deleteMany();

  const users = Array.from({ length: TOTAL_USERS }, generateUser);

  const usersResult = await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  console.log(`Inserted ${usersResult.count} users`);

  const userIds = (
    await prisma.user.findMany({
      select: { id: true },
    })
  ).map((u) => u.id);

  const properties = Array.from({ length: TOTAL_PROPERTIES }, () => {
    const ownerId = faker.helpers.arrayElement(userIds);
    return generateProperty(ownerId);
  });

  const propsResult = await prisma.property.createMany({
    data: properties,
  });

  console.log(`Inserted ${propsResult.count} properties`);

  console.log("SEED COMPLETED!");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
