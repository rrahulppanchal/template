import { z } from 'zod';
import { userSchema } from '@repo/utils';

export const createUserSchema = z.object({
  body: userSchema,
});

export type CreateUserRequest = z.infer<typeof createUserSchema>;
