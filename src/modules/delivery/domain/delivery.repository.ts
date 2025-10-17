import { Delivery } from './delivery.entity';

export interface IDeliveryRepository {
  findById(id: string): Promise<Delivery | null>;
  findAll(): Promise<Delivery[]>;
  save(delivery: Delivery): Promise<void>;
  delete(id: string): Promise<void>;
}