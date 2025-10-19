import { z } from 'zod';

export const calculateShippingRateSchema = z.object({
  body: z.object({
    weight: z.number().positive(),
    service_zone_id: z.string().uuid(),
  }),
});

export type CalculateShippingRateDTO = z.infer<typeof calculateShippingRateSchema>['body'];
