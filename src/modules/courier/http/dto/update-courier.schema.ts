import { z } from 'zod';

export const updateCourierSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  phone: z.string().min(1, 'Phone is required').optional(),
  email: z.string().email('Invalid email address').optional(),
  vehicle: z.string().optional().nullable(),
  isAvailable: z.boolean().optional(),
});

export type UpdateCourierDTO = z.infer<typeof updateCourierSchema>;