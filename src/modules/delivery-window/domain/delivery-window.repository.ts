import { DeliveryWindow } from './delivery-window.entity';

export interface IDeliveryWindowRepository {
  findById(id: string): Promise<DeliveryWindow | null>;
  findAll(): Promise<DeliveryWindow[]>;
  save(deliveryWindow: DeliveryWindow): Promise<void>;
  update(deliveryWindow: DeliveryWindow): Promise<DeliveryWindow>;
  delete(id: string): Promise<void>;
}