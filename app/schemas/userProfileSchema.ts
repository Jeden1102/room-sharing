import { z } from "zod";

export const userProfileSchema = z
  .object({
    accountType: z.enum(["PRIVATE", "BUSINESS"]).default("PRIVATE"),
    firstName: z.string().max(130).optional().nullable(),
    lastName: z.string().max(130).optional().nullable(),
    companyName: z.string().optional().nullable(),
    nip: z.string().min(10).max(10).optional().nullable(),
    website: z.string().url().or(z.string().length(0)).optional().nullable(),
    address: z.string().max(255).optional().nullable(),
    age: z.number().min(1).max(130).optional().nullable(),
    gender: z.string().optional().nullable(),
    phone: z.string().max(20).optional().nullable(),
    description: z.string().max(20000).optional().nullable(),
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
  })
  .superRefine((data, ctx) => {
    if (data.accountType === "BUSINESS") {
      if (!data.companyName || data.companyName.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["companyName"],
        });
      }
    }

    if (data.accountType === "PRIVATE") {
      if (!data.firstName || data.firstName.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["firstName"],
        });
      }
      if (!data.lastName || data.lastName.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["lastName"],
        });
      }
      if (!data.age) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["age"],
        });
      }
      if (!data.gender || data.gender.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["gender"],
        });
      }
    }
  });
