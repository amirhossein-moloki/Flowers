import { z } from 'zod';
import { UserRole } from '@prisma/client';

export const UpdateUserSchema = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  role: z.nativeEnum(UserRole).optional(),
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
