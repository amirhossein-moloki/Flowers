import { z } from 'zod';

export const createOrderPromotionSchema = z.object({
  body: z.object({
    order_id: z.string().uuid(),
    promotion_id: z.string().uuid(),
    discount_applied: z.number().positive(),
  }),
});
