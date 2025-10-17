import { z } from 'zod';
import { UserRole } from '../../../../../core/domain/enums';

export const CreateUserSchema = z.object({
  body: z.object({
    username: z.string().min(3, 'Username must be at least 3 characters long'),
    full_name: z.string().min(1, 'Full name is required'),
    phone: z.string().regex(/^\d{11}$/, 'Phone number must be 11 digits'),
    email: z.string().email('Invalid email format'),
    role: z.nativeEnum(UserRole),
    // Password should be handled separately, perhaps in a different DTO/use-case for security
  }),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>['body'];