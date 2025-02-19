import { z } from 'zod';
import { emailSchema } from './shared/email.model';
import { passwordSchema } from './shared/password.model';

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  password: passwordSchema,
});

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
