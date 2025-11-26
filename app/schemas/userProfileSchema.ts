import { z } from "zod";

export const userProfileSchema = z.object({
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  age: z.number().min(1).max(130).optional().nullable(),
  gender: z.string().nullable(),
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
});
