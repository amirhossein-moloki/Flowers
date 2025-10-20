import { z } from 'zod';

export const VerifyPaymentSchema = z.object({
  body: z.object({
    paymentId: z.string(),
    verificationCode: z.string(),
  }),
});
