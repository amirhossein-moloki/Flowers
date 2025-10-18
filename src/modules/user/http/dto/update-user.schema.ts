import { UserRole } from '@prisma/client';
import { z } from 'zod';

export const updateUserSchema = z.object({
  body: z.object({
    username: z.string().min(3, 'Username must be at least 3 characters long').optional(),
    full_name: z.string().min(3, 'Full name must be at least 3 characters long').optional(),
    phone: z.string().regex(/^\+[1-9]\d{1,14}$/, 'Phone number must be a valid E.164 number').optional(),
    email: z.string().email('Invalid email address').optional(),
    role: z.nativeEnum(UserRole).optional(),
    is_active: z.boolean().optional(),
  }),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>['body'];