import { z } from 'zod';

export const updateShippingRateSchema = z.object({
  body: z.object({
    service_zone_id: z.string().uuid().optional(),
    rate: z.number().positive().optional(),
    currency: z.string().length(3).optional(),
    weight_unit: z.string().optional(),
    min_weight: z.number().nonnegative().optional(),
    max_weight: z.number().positive().optional(),
    is_active: z.boolean().optional(),
  }),
});

export type UpdateShippingRateDTO = z.infer<typeof updateShippingRateSchema>['body'];
