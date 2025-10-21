import { z } from 'zod';

export const createVendorOutletSchema = z.object({
  vendorId: z.string().uuid(),
  name: z.string().min(1),
  address: z.string().min(1),
  latitude: z.number(),
  longitude: z.number(),
  is_active: z.boolean().optional().default(true),
});

export type CreateVendorOutletInput = z.infer<
  typeof createVendorOutletSchema
>;
