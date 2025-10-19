import { z } from 'zod';

export const createShippingRateSchema = z.object({
  body: z.object({
    id: z.string().uuid().optional(),
    service_zone_id: z.string().uuid(),
    rate: z.number().positive(),
    currency: z.string().length(3),
    weight_unit: z.string(),
    min_weight: z.number().nonnegative(),
    max_weight: z.number().positive(),
    is_active: z.boolean().optional(),
  }),
});

export type CreateShippingRateDTO = z.infer<typeof createShippingRateSchema>['body'];
