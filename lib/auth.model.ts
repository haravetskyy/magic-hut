import { z } from 'zod';

export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name has to be at least 2 characters long.' })
    .max(120, {
      message: 'First name has to be shorter than 120 characters.',
    }),
  lastName: z
    .string()
    .min(2, { message: 'Last name has to be at least 2 characters long.' })
    .max(120, {
      message: 'Last name has to be shorter than 120 characters.',
    }),
  email: z
    .string()
    .email()
    .max(320, { message: 'Email has to be shorter than 320 letters.' }),
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

export type SignUpValues = z.infer<typeof signUpSchema>;

export const signInSchema = signUpSchema.omit({
  firstName: true,
  lastName: true,
});

export type SignInValues = z.infer<typeof signInSchema>;
