import { z } from 'zod';

export const updateVendorSchema = z.object({
  body: z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long').optional(),
    description: z.string().optional(),
    email: z.string().email('Invalid email address').optional(),
    phone: z.string().regex(/^\+[1-9]\d{1,14}$/, 'Phone number must be a valid E.164 number').optional(),
    address: z.string().optional(),
    is_active: z.boolean().optional(),
  }),
});

export type UpdateVendorInput = z.infer<typeof updateVendorSchema>['body'];
