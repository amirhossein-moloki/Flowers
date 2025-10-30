import { z } from 'zod';

export const CreateProductImageSchema = z.object({
  body: z.object({
    product_id: z.string().uuid(),
    url: z.string().url(),
    sort_order: z.number().optional(),
  }),
});

export type CreateProductImageDto = z.infer<typeof CreateProductImageSchema>;
