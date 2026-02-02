import { z } from "zod";

export const userProfileSchema = z.object({
  accountType: z.enum(["PRIVATE", "BUSINESS"]).default("PRIVATE"),
  firstName: z.string().min(1).max(130),
  lastName: z.string().min(1).max(130),
  companyName: z.string().optional().nullable(),
  nip: z.string().max(20).optional().nullable(),
  website: z.string().url().or(z.string().length(0)).optional().nullable(),
  address: z.string().max(255).optional().nullable(),
  age: z.number().min(1).max(130),
  gender: z.string(),
  phone: z.string().max(20).optional().nullable(),
  description: z.string().max(2048).optional().nullable(),
  interests: z.array(z.string()).optional(),
  occupations: z.array(z.string()).optional(),
  searchPreferences: z.array(z.string()).optional(),
  searchPropertyTypes: z.array(z.string()).optional(),
  noiseCompatibility: z.array(z.string()).optional(),
  petsCompatibility: z.array(z.string()).optional(),
  smoker: z.boolean().nullable(),
  pets: z.boolean().nullable(),
  budgetMax: z.number().min(1).max(99999999).nullable(),
  moodboardImages: z.array(z.string()).optional(),
  city: z.string().nullable(),
  districts: z.array(z.string()).optional(),
  contactEmail: z
    .string()
    .email()
    .or(z.string().length(0))
    .nullable()
    .optional(),
});
