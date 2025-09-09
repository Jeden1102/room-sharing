export type Image = {
  src: string;
  alt?: string;
};

export type Video = {
  url: string;
  title?: string;
  thumbnail?: string;
};

export type Location = {
  address: string;
  city: string;
  district?: string;
  postalCode?: string;
  country: string;
  latitude?: number;
  longitude?: number;
  nearbyPlaces?: string[];
};

export type Utilities = {
  heating: "central" | "gas" | "electric" | "district" | "other";
  water: "city" | "well" | "other";
  electricity: boolean;
  internet: boolean;
  tv: boolean;
  gas: boolean;
};

export type Amenities = {
  furnished: boolean;
  kitchen: boolean;
  washingMachine: boolean;
  dishwasher: boolean;
  fridge: boolean;
  oven: boolean;
  microwave: boolean;
  airConditioning: boolean;
  balcony?: boolean;
  terrace?: boolean;
  parking?: "street" | "private" | "garage" | "none";
  elevator?: boolean;
  storage?: boolean;
};

export type Security = {
  intercom?: boolean;
  cctv?: boolean;
  alarm?: boolean;
  securityDoor?: boolean;
  doorman?: boolean;
  smokeDetectors?: boolean;
};

export type Details = {
  propertyType: "apartment" | "house" | "room" | "studio";
  transactionType: "rent" | "sale" | "sublease";
  floor?: number;
  totalFloors?: number;
  rooms: number;
  area: number;
  availableFrom?: Date;
  furnished?: boolean;
  petsAllowed?: boolean;
  smokingAllowed?: boolean;
  yearBuilt?: number;
  buildingCondition?: "new" | "good" | "toRenovate" | "developer";
  ownershipType?: "freehold" | "cooperative" | "leasehold" | "other";
};

export type SharingInfo = {
  totalOccupants: number;
  currentOccupants: number;
  availableSpots: number;
  preferredOccupants?: string[];
  description?: string;
  roomType?: "single" | "double" | "shared";
  roomArea?: number;
  currentOccupantsProfiles?: {
    age: number;
    gender: "male" | "female" | "other";
    occupation: "student" | "working" | "other";
  }[];
  ageRange?: [number, number];
  genderPreference?: "male" | "female" | "any";
  languages?: string[];
};

export type ExtraInfo = {
  deposit?: number;
  billsPerMonth?: number;
  minRentalPeriod?: string;
  maxRentalPeriod?: string;
  availability?: string;
};

export type UserRef = {
  id: string;
  name?: string;
  avatar?: string;
};

export type Property = {
  id: string;
  title: string;
  description: string;
  images: Image[];
  videos?: Video[];
  location: Location;
  details: Details;
  utilities?: Utilities;
  amenities?: Amenities;
  security?: Security;
  sharing?: SharingInfo;
  extra?: ExtraInfo;
  price: number;
  currency?: "PLN" | "EUR" | "USD";
  createdAt: Date;
  updatedAt: Date;
  owner: UserRef;
  interestedUsers?: UserRef[];
  slug?: string;
  isPromoted?: boolean;
  views?: number;
};

export type Teaser = {
  id: string;
  images: Image[];
  name: string;
  badge1Value: string;
  badge2Value: string;
  location: string;
  area: number;
  occupants?: string;
  rooms: string;
  price?: number;
  floor?: string;
  period?: string;
};
