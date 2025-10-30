import { z } from 'zod';

export const UpdateProductImageSchema = z.object({
  body: z.object({
    product_id: z.string().uuid().optional(),
    url: z.string().url().optional(),
    sort_order: z.number().optional(),
  }),
});

export type UpdateProductImageDto = z.infer<typeof UpdateProductImageSchema>;
