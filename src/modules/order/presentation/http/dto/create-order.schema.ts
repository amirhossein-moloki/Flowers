import { z } from 'zod';

export const CreateOrderSchema = z.object({
  body: z.object({
    userId: z.string(),
    items: z.array(z.object({
      productId: z.string(),
      quantity: z.number(),
      price: z.number(),
    })).min(1),
  }),
});
