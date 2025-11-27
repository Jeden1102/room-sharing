import { z } from "zod";

export const contactSchema = z.object({
  name: z.string(),
  email: z
    .string()
    .email(),
  reason: z.string(),
  description: z.string().max(2048),
  terms: z.boolean().refine((value) => value),
});
