import { z } from 'zod';

export const updateUserSchema = z.object({
  body: z.object({
    username: z.string().min(3).optional(),
    email: z.string().email().optional(),
    password: z.string().min(8).optional(),
  }),
});
