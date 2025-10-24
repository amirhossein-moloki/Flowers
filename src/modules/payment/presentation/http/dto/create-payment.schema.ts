import { z } from 'zod';

export const CreatePaymentSchema = z.object({
  body: z.object({
    orderId: z.string(),
    amount: z.number(),
    method: z.string(),
    idempotencyKey: z.string().optional(),
  }),
});
