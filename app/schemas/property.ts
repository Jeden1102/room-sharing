import { z } from "zod";

export const propertyBaseSchema = z.object({
  title: z.string("Pole wymagane").min(5, "Tytuł za krótki").max(200),
  description: z.string().max(2000).nullable().optional(),
  type: z.enum(["APARTMENT", "HOUSE", "ROOM", "STUDIO"]).or(z.string()),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  price: z.number("Pole wymagane").int().nonnegative(),
  deposit: z.number().int().nonnegative().nullable().optional(),
  city: z.string("Pole wymagane"),
  district: z.string().nullable().optional(),
  buildingNumber: z.string().nullable().optional(),
  street: z.string().nullable().optional(),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
  sizeM2: z.number().int().nullable().optional(),
  rooms: z.number().int().nullable().optional(),
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
  roommates: z.array(z.string()).optional().default([]),
});

export const propertyCreateSchema = propertyBaseSchema

export type PropertyCreateInput = z.infer<typeof propertyCreateSchema>;
export const propertyResolver = propertyCreateSchema;
