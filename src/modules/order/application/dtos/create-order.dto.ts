import { z } from 'zod';
import { CreateOrderSchema } from '../../presentation/http/dto/create-order.schema';

// Type extracted from the schema for use in the application layer
export type CreateOrderDto = z.infer<typeof CreateOrderSchema>['body'];
export type CreateOrderItemDto = z.infer<typeof CreateOrderSchema>['body']['items'][0];
