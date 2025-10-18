import { z } from 'zod';

export const updateDeliveryStatusSchema = z.object({
  code: z.string().min(1, 'Code is required').optional(),
  name: z.string().min(1, 'Name is required').optional(),
  display_order: z.number().optional(),
});

export type UpdateDeliveryStatusDTO = z.infer<typeof updateDeliveryStatusSchema>;