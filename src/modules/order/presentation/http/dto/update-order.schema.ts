import { z } from 'zod';
import { OrderStatus } from '@/modules/order/domain/order.entity';

export const UpdateOrderSchema = z.object({
  body: z.object({
    status: z.nativeEnum(OrderStatus).optional(),
  }),
  params: z.object({
    id: z.string(),
  }),
});
