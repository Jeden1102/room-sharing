import { z } from "zod";

export const contactSchema = z.object({
  name: z.string({ message: "Name is required" }),
  email: z
    .string({ message: "E-mail address is required" })
    .email({ message: "Invalid email address" }),
  reason: z.string({ message: "Contact reason is required" }),
  description: z.string({ message: "Description is required" }).max(2048),
  terms: z.boolean().refine((value) => value, { message: "You must agree" }),
});
