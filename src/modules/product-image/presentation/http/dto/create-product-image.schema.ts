import { z } from 'zod';

export const CreateProductImageSchema = z.object({
  body: z.object({
    productId: z.string().uuid(),
    url: z.string().url(),
    sort_order: z.number().int().optional(),
  }),
});

export type CreateProductImageDto = z.infer<typeof CreateProductImageSchema>['body'];
