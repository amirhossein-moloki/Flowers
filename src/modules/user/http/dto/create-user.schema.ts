import { z } from 'zod';
import { UserRole } from '@/core/domain/enums';

export const createUserSchema = z.object({
  body: z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.nativeEnum(UserRole),
  }),
});
