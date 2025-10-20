import { OrderStatus } from '../../domain/order.entity';
import { CreateOrderItemDto } from './create-order.dto';

export interface UpdateOrderDto {
  userId?: string;
  items?: CreateOrderItemDto[];
  status?: OrderStatus;
  total?: number;
}
