import { z } from 'zod';

export const createCourierSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone is required'),
  email: z.string().email('Invalid email address'),
  vehicle: z.string().optional().nullable(),
  isAvailable: z.boolean().optional(),
});

export type CreateCourierDTO = z.infer<typeof createCourierSchema>;