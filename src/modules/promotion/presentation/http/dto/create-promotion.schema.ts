import { z } from 'zod';
import { DiscountType } from '@prisma/client';

export const createPromotionSchema = z.object({
  body: z.object({
    code: z.string().min(1),
    description: z.string().optional(),
    discount_type: z.nativeEnum(DiscountType),
    discount_value: z.number().positive(),
    start_date: z.string().transform((val) => new Date(val)),
    end_date: z.string().transform((val) => new Date(val)).optional(),
    max_uses: z.number().int().positive().optional(),
    is_active: z.boolean().optional().default(true),
  }),
});
