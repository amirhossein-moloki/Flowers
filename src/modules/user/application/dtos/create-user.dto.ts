import { z } from 'zod';
import { UserRole } from '@/core/domain/enums';

export const CreateUserSchema = z.object({
  body: z.object({
    username: z.string().min(3, 'Username must be at least 3 characters long'),
    email: z.string().email('Invalid email format'),
    role: z.nativeEnum(UserRole),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
  }),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>['body'];