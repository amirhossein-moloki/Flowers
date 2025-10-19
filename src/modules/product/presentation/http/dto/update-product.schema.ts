import { z } from 'zod';

export const UpdateProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Product name cannot be empty.').optional(),
    description: z.string().nullable().optional(),
    price: z.number().min(0, 'Price cannot be negative.').optional(),
    stock: z.number().min(0, 'Stock cannot be negative.').optional(),
  }),
});

export type UpdateProductDto = z.infer<typeof UpdateProductSchema>['body'];
