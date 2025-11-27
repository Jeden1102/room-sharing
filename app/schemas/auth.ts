import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8),
    passwordRepeat: z
      .string()
      .min(8),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    path: ["passwordRepeat"],
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8),
});

export const passwordResetSchema = z
  .object({
    password: z
      .string()
      .min(8),
    passwordRepeat: z
      .string()
      .min(8),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    path: ["passwordRepeat"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});
