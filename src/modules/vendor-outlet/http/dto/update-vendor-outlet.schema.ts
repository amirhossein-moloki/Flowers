import { z } from 'zod';

export const updateVendorOutletSchema = z.object({
  name: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  isActive: z.boolean().optional(),
});

export type UpdateVendorOutletInput = z.infer<
  typeof updateVendorOutletSchema
>;
