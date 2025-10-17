import { DeliveryStatus } from './delivery-status.entity';

export interface IDeliveryStatusRepository {
  findById(id: string): Promise<DeliveryStatus | null>;
  findAll(): Promise<DeliveryStatus[]>;
  save(deliveryStatus: DeliveryStatus): Promise<void>;
  delete(id: string): Promise<void>;
}