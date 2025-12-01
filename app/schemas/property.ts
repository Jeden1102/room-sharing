import { z } from "zod";

export const propertyBaseSchema = z.object({
  title: z.string("Pole wymagane").min(5, "Tytuł za krótki").max(200),
  description: z.string().max(2000),
  type: z.enum(["APARTMENT", "HOUSE", "ROOM", "STUDIO"]).or(z.string()),
  listingType: z.enum(["RENT", "SALE"]).or(z.string()),
  status: z.enum(["ACTIVE", "DRAFT", "RESERVED"]).optional(),
  price: z.number("Pole wymagane").int().nonnegative(),
  deposit: z.number().int().nonnegative().nullable().optional(),
  city: z.string("Pole wymagane").min(1, "Pole wymagane").max(200),
  district: z.string().nullable().optional(),
  buildingNumber: z.string().nullable().optional(),
  street: z.string().nullable().optional(),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
  mainImageIdx: z.number().nullable().optional(),
  sizeM2: z.number().nonnegative(),
  rooms: z.number().nonnegative(),
  floor: z.number().int().nullable().optional(),
  yearBuilt: z.number().int().nullable().optional(),
  furnished: z.boolean().nullable().optional(),
  balcony: z.boolean().nullable().optional(),
  elevator: z.boolean().nullable().optional(),
  parking: z.boolean().nullable().optional(),
  petsAllowed: z.boolean().nullable().optional(),
  smokingAllowed: z.boolean().nullable().optional(),
  internet: z.boolean().nullable().optional(),
  tv: z.boolean().nullable().optional(),
  washingMachine: z.boolean().nullable().optional(),
  dishwasher: z.boolean().nullable().optional(),
  airConditioning: z.boolean().nullable().optional(),
  isShared: z.boolean().default(false),
  images: z.array(z.string()).optional().default([]),
  ownerId: z.string().optional(),
  email: z.email().nullable().optional(),
  phone: z.string().nullable().optional(),
  roommates: z.array(z.string()).optional().default([]),
});

export const propertyCreateSchema = propertyBaseSchema

export type PropertyCreateInput = z.infer<typeof propertyCreateSchema>;
export const propertyResolver = propertyCreateSchema;
