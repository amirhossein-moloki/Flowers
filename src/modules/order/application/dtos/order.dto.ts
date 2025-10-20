import { OrderItemDto } from './order-item.dto';
import { OrderStatus } from '../../domain/order.entity';

export interface OrderDto {
  id: string;
  user_id: string;
  status: OrderStatus;
  total: number;
  created_at: Date;
  updated_at: Date;
  items: OrderItemDto[];
}
