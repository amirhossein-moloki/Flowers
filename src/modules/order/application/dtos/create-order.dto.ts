import { z } from 'zod';

// DTO for a single item in the order
const CreateOrderItemSchema = z.object({
  product_id: z.string().uuid(),
  quantity: z.number().min(1),
  price: z.number().positive(),
  // Note: `total` is calculated in the use case, not passed in.
});

// Zod schema for validating the incoming request body for creating an order
export const CreateOrderSchema = z.object({
  body: z.object({
    customer_id: z.string().uuid(),
    vendor_id: z.string().uuid(),
    outlet_id: z.string().uuid(),
    customer_address_id: z.string().uuid(),
    delivery_window_id: z.string().uuid(),
    note: z.string().optional(),
    scheduled_at: z.string().datetime(), // Expecting ISO string from client
    items: z.array(CreateOrderItemSchema).min(1, 'Order must have at least one item.'),
    // Fields like subtotal, delivery_fee, etc., will be calculated in the use case.
  }),
});

// Type extracted from the schema for use in the application layer
export type CreateOrderDto = z.infer<typeof CreateOrderSchema>['body'];
export type CreateOrderItemDto = z.infer<typeof CreateOrderItemSchema>;