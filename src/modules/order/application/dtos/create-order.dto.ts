import { z } from 'zod';

export const CreateOrderSchema = z.object({
  body: z.object({
    userId: z.string().uuid('Invalid user ID format'),
    items: z.array(
      z.object({
        productId: z.string().uuid('Invalid product ID format'),
        quantity: z.number().min(1, 'Quantity must be at least 1'),
        price: z.number().positive('Price must be a positive number'),
      }),
    ),
  }),
});

export type CreateOrderDto = z.infer<typeof CreateOrderSchema>['body'];