import { z } from 'zod';

export const emailSchema = z
  .string()
  .email()
  .max(320, { message: 'Email has to be shorter than 320 letters.' });
