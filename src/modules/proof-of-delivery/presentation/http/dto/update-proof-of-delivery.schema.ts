import { z } from 'zod';

export const updateProofOfDeliverySchema = z.object({
  body: z.object({
    signature_url: z.string().url().optional(),
    photo_url: z.string().url().optional(),
    notes: z.string().optional(),
    is_verified: z.boolean().optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});
