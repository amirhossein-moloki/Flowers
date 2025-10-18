import { z } from 'zod';

export const createDeliveryStatusSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  name: z.string().min(1, 'Name is required'),
  display_order: z.number(),
});

export type CreateDeliveryStatusDTO = z.infer<typeof createDeliveryStatusSchema>;