import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export type UserSchema = z.infer<typeof userSchema>;
