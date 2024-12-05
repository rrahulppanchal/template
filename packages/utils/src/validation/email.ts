import { z } from 'zod';

export const emailSchema = z.string().email();

export const isValidEmail = (email: string): boolean => {
  const result = emailSchema.safeParse(email);
  return result.success;
};
