import { z } from 'zod';

export const updateOrderPromotionSchema = z.object({
  body: z.object({
    order_id: z.string().uuid().optional(),
    promotion_id: z.string().uuid().optional(),
    discount_applied: z.number().positive().optional(),
  }),
});
