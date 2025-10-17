import { OrderStatus } from './order-status.entity';

export interface IOrderStatusRepository {
  findById(id: string): Promise<OrderStatus | null>;
  findAll(): Promise<OrderStatus[]>;
  save(orderStatus: OrderStatus): Promise<void>;
  delete(id: string): Promise<void>;
}