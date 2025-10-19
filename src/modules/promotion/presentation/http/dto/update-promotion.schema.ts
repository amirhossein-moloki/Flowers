import { z } from 'zod';
import { DiscountType } from '@prisma/client';

export const updatePromotionSchema = z.object({
  body: z.object({
    code: z.string().min(1).optional(),
    description: z.string().optional(),
    discount_type: z.nativeEnum(DiscountType).optional(),
    discount_value: z.number().positive().optional(),
    start_date: z.string().transform((val) => new Date(val)).optional(),
    end_date: z.string().transform((val) => new Date(val)).optional(),
    max_uses: z.number().int().positive().optional(),
    is_active: z.boolean().optional(),
  }),
});
