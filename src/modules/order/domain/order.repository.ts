import { IRepository } from '../../../../core/domain/repository';
import { Order } from './order.entity';

export interface IOrderRepository extends IRepository<Order> {
  findById(id: string): Promise<Order | null>;
  findByUserId(userId: string, page: number, pageSize: number): Promise<Order[]>;
  save(order: Order): Promise<void>;
}