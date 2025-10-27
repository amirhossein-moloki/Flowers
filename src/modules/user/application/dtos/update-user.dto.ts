import { z } from 'zod';

export const UpdateUserSchema = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  role: z.string().optional(),
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
