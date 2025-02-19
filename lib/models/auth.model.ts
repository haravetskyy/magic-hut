import { z } from 'zod';
import { firstNameSchema, lastNameSchema } from './shared/name.model';
import { emailSchema } from './shared/email.model';
import { passwordSchema } from './shared/password.model';

export const signUpSchema = z.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const signInSchema = signUpSchema.omit({
  firstName: true,
  lastName: true,
});

export type SignInValues = z.infer<typeof signInSchema>;
