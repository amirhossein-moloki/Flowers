import { z } from 'zod';

export const CreateVendorSchema = z.object({
  body: z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    description: z.string().optional(),
    email: z.string().email('Invalid email address'),
    phone: z.string().regex(/^\+[1-9]\d{1,14}$/, 'Phone number must be a valid E.164 number'),
    address: z.string(),
    is_active: z.boolean().optional(),
  }),
});

export type CreateVendorDto = z.infer<typeof CreateVendorSchema>['body'];
