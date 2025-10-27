import { Result } from '@/core/utils/result';
import { OrderStatus } from './order-status.entity';

export interface IOrderStatusRepository {
  findById(id: string): Promise<Result<OrderStatus | null, Error>>;
  findAll(): Promise<Result<OrderStatus[], Error>>;
  save(orderStatus: OrderStatus): Promise<Result<OrderStatus, Error>>;
  delete(id: string): Promise<Result<void, Error>>;
}