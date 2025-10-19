import { z } from 'zod';

export const createProofOfDeliverySchema = z.object({
  body: z.object({
    delivery_id: z.string().uuid(),
    signature_url: z.string().url().optional(),
    photo_url: z.string().url().optional(),
    notes: z.string().optional(),
  }),
});
