import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email()
    .max(320, { message: 'Email has to be shorter than 320 letters.' }),
});

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(12, { message: 'Password must be at least 12 characters long.' })
    .max(120, { message: 'Password has to be shorter than 120 characters.' })
    .refine((password) => /[A-Z]/.test(password), {
      message: 'Password must contain at least one uppercase letter.',
    })
    .refine((password) => /[a-z]/.test(password), {
      message: 'Password must contain at least one lowercase letter.',
    })
    .refine((password) => /[0-9]/.test(password), {
      message: 'Password must contain at least one number.',
    })
    .refine((password) => /[^A-Za-z0-9]/.test(password), {
      message: 'Password must contain at least one special character.',
    }),
});

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
