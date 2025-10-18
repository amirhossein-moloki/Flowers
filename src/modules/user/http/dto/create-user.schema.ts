import { UserRole } from '@prisma/client';
import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    username: z.string().min(3, 'Username must be at least 3 characters long'),
    full_name: z.string().min(3, 'Full name must be at least 3 characters long'),
    phone: z.string().regex(/^\+[1-9]\d{1,14}$/, 'Phone number must be a valid E.164 number'),
    email: z.string().email('Invalid email address'),
    role: z.nativeEnum(UserRole),
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>['body'];