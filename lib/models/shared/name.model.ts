import { z } from 'zod';

export const firstNameSchema = z
  .string()
  .min(2, { message: 'First name has to be at least 2 characters long.' })
  .max(120, {
    message: 'First name has to be shorter than 120 characters.',
  });

export const lastNameSchema = z
  .string()
  .min(2, { message: 'Last name has to be at least 2 characters long.' })
  .max(120, {
    message: 'Last name has to be shorter than 120 characters.',
  });
