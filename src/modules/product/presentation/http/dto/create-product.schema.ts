import { z } from 'zod';

export const CreateProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Product name cannot be empty.'),
    description: z.string().nullable().optional(),
    price: z.number().min(0, 'Price cannot be negative.'),
    stock: z.number().min(0, 'Stock cannot be negative.'),
  }),
});

export type CreateProductDto = z.infer<typeof CreateProductSchema>['body'];
