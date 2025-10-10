import { z } from "zod";

export const userProfileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  age: z.number().min(1).max(130).optional().nullable(),
  gender: z.string().nullable(),
  phone: z.string().min(5).max(20).optional(),
  description: z.string().max(2048).optional(),
  interests: z.array(z.string()).optional(),
  occupation: z.array(z.string()).optional(),
  searchPreferences: z.array(z.string()).optional(),
  searchPropertyType: z.array(z.string()).optional(),
  noiseCompatibility: z.array(z.string()).optional(),
  petsCompatibility: z.array(z.string()).optional(),
  smoker: z.boolean().nullable(),
  pets: z.boolean().nullable(),
  budgetMax: z.number().min(1).max(99999999).nullable(),
  moodboardImages: z.array(z.string()).optional(),
  city: z.string(),
  districts: z.array(z.string()).optional(),
});
