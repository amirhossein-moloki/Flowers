import { Delivery } from '../domain/delivery.entity';

export interface IDeliveryRepository {
  findById(id: string): Promise<Delivery | null>;
  findAll(page: number, pageSize: number): Promise<Delivery[]>;
  save(delivery: Delivery): Promise<void>;
  delete(id: string): Promise<void>;
}
